import { describe, it, expect } from "vitest";
import type { Dataset } from "@/data/datasets";
import { datasets as realDatasets } from "@/data/datasets";
import {
  FORMATS,
  buildFilename,
  byteLength,
  collectColumns,
  countFields,
  countRecords,
  flattenCell,
  getFormatInfo,
  serialize,
  toCSV,
  toJSON,
  toJSONL,
  toMarkdown,
  toTSV,
  toXML,
  toYAML,
} from "./dataExport";

const skills: Dataset = {
  id: "skills",
  name: "Skills",
  description: "Skill categories.",
  group: "Portfolio",
  records: [
    { category: "Backend", skills: ["Node.js", "GO"] },
    { category: "Frontend", skills: ["React", "Vite"] },
  ],
};

const projects: Dataset = {
  id: "projects",
  name: "Projects",
  description: "Projects.",
  group: "Portfolio",
  records: [{ title: "Wikija", role: "Engineer", tags: ["NestJS"] }],
};

describe("flattenCell", () => {
  it("joins arrays with a semicolon separator", () => {
    expect(flattenCell(["a", "b", "c"])).toBe("a; b; c");
  });

  it("renders null/undefined as empty string", () => {
    expect(flattenCell(null)).toBe("");
    expect(flattenCell(undefined)).toBe("");
  });

  it("JSON-stringifies nested objects", () => {
    expect(flattenCell({ a: 1 })).toBe('{"a":1}');
  });

  it("stringifies primitives", () => {
    expect(flattenCell(42)).toBe("42");
    expect(flattenCell(true)).toBe("true");
  });
});

describe("collectColumns", () => {
  it("returns the union of keys in first-seen order", () => {
    expect(
      collectColumns([{ a: 1, b: 2 }, { b: 3, c: 4 }]),
    ).toEqual(["a", "b", "c"]);
  });
});

describe("toJSON", () => {
  it("emits a bare array for a single dataset", () => {
    const parsed = JSON.parse(toJSON([skills]));
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toEqual(skills.records);
  });

  it("keys records by dataset id for multiple datasets", () => {
    const parsed = JSON.parse(toJSON([skills, projects]));
    expect(Object.keys(parsed)).toEqual(["skills", "projects"]);
    expect(parsed.projects).toEqual(projects.records);
  });
});

describe("toJSONL", () => {
  it("emits one valid JSON object per line", () => {
    const lines = toJSONL([skills]).split("\n");
    expect(lines).toHaveLength(2);
    expect(JSON.parse(lines[0])).toEqual(skills.records[0]);
  });

  it("tags each line with _dataset when multiple datasets are exported", () => {
    const lines = toJSONL([skills, projects]).split("\n");
    expect(lines).toHaveLength(3);
    const parsed = lines.map((l) => JSON.parse(l));
    expect(parsed[0]._dataset).toBe("skills");
    expect(parsed[2]._dataset).toBe("projects");
  });
});

describe("toCSV / toTSV", () => {
  it("produces a header plus one row per record", () => {
    const rows = toCSV([skills]).split("\n");
    expect(rows[0]).toBe("category,skills");
    expect(rows[1]).toBe("Backend,Node.js; GO");
    expect(rows).toHaveLength(3);
  });

  it("quotes values containing the delimiter", () => {
    const ds: Dataset = {
      id: "d",
      name: "d",
      description: "",
      group: "g",
      records: [{ note: "a,b", plain: "x" }],
    };
    const rows = toCSV([ds]).split("\n");
    expect(rows[1]).toBe('"a,b",x');
  });

  it("escapes embedded double quotes by doubling them", () => {
    const ds: Dataset = {
      id: "d",
      name: "d",
      description: "",
      group: "g",
      records: [{ note: 'say "hi"' }],
    };
    expect(toCSV([ds]).split("\n")[1]).toBe('"say ""hi"""');
  });

  it("stacks heterogeneous datasets with a leading _dataset column", () => {
    const rows = toCSV([skills, projects]).split("\n");
    expect(rows[0]).toBe("_dataset,category,skills,title,role,tags");
    // skills rows have empty project columns
    expect(rows[1]).toBe("skills,Backend,Node.js; GO,,,");
    // project row has empty skills columns
    expect(rows[3]).toBe("projects,,,Wikija,Engineer,NestJS");
  });

  it("uses tabs for TSV", () => {
    const rows = toTSV([skills]).split("\n");
    expect(rows[0]).toBe("category\tskills");
    expect(rows[1]).toBe("Backend\tNode.js; GO");
  });
});

describe("toYAML", () => {
  it("emits a list of mappings for a single dataset", () => {
    const yaml = toYAML([skills]);
    expect(yaml).toContain("- category: Backend");
    expect(yaml).toContain("skills:");
    expect(yaml).toContain("- Node.js");
  });

  it("nests datasets under their id for multiple datasets", () => {
    const yaml = toYAML([skills, projects]);
    expect(yaml.startsWith("skills:")).toBe(true);
    expect(yaml).toContain("projects:");
  });

  it("quotes values that would otherwise be ambiguous", () => {
    const ds: Dataset = {
      id: "d",
      name: "d",
      description: "",
      group: "g",
      records: [{ v: "true", n: "123", empty: "" }],
    };
    const yaml = toYAML([ds]);
    expect(yaml).toContain('v: "true"');
    expect(yaml).toContain('n: "123"');
    expect(yaml).toContain('empty: ""');
  });
});

describe("toXML", () => {
  it("wraps datasets and records with escaping", () => {
    const ds: Dataset = {
      id: "d",
      name: "D & Co",
      description: "",
      group: "g",
      records: [{ note: "a < b", tags: ["x", "y"] }],
    };
    const xml = toXML([ds]);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('name="D &amp; Co"');
    expect(xml).toContain("<note>a &lt; b</note>");
    expect(xml).toContain("<item>x</item>");
  });
});

describe("toMarkdown", () => {
  it("renders a heading and table per dataset", () => {
    const md = toMarkdown([skills]);
    expect(md).toContain("## Skills");
    expect(md).toContain("| category | skills |");
    expect(md).toContain("| Backend | Node.js; GO |");
  });

  it("escapes pipe characters inside cells", () => {
    const ds: Dataset = {
      id: "d",
      name: "D",
      description: "",
      group: "g",
      records: [{ v: "a|b" }],
    };
    expect(toMarkdown([ds])).toContain("| a\\|b |");
  });
});

describe("serialize", () => {
  it("returns the right mime type and extension per format", () => {
    for (const f of FORMATS) {
      const result = serialize([skills], f.id);
      expect(result.extension).toBe(f.extension);
      expect(result.mimeType).toBe(f.mimeType);
      expect(result.content.length).toBeGreaterThan(0);
    }
  });
});

describe("buildFilename", () => {
  it("names single-dataset files by id", () => {
    expect(buildFilename([skills], "json")).toMatch(/^portfolio-skills-\d{4}-\d{2}-\d{2}\.json$/);
  });

  it("names multi-dataset files by count", () => {
    expect(buildFilename([skills, projects], "csv")).toMatch(
      /^portfolio-2-datasets-\d{4}-\d{2}-\d{2}\.csv$/,
    );
  });
});

describe("stats helpers", () => {
  it("counts records across datasets", () => {
    expect(countRecords([skills, projects])).toBe(3);
  });

  it("counts unique namespaced fields", () => {
    expect(countFields([skills])).toBe(2);
    expect(countFields([skills, projects])).toBe(5);
  });

  it("measures UTF-8 byte length", () => {
    expect(byteLength("abc")).toBe(3);
    expect(byteLength("é")).toBe(2);
  });
});

describe("getFormatInfo", () => {
  it("falls back to JSON for an unknown format", () => {
    // @ts-expect-error intentionally invalid
    expect(getFormatInfo("bogus").id).toBe("json");
  });
});

describe("real datasets integrity", () => {
  it("every dataset has a unique id, a name and at least one record", () => {
    const ids = new Set<string>();
    for (const d of realDatasets) {
      expect(d.id).toBeTruthy();
      expect(d.name).toBeTruthy();
      expect(ids.has(d.id)).toBe(false);
      ids.add(d.id);
      expect(d.records.length).toBeGreaterThan(0);
    }
  });

  it("serializes the full registry to valid JSON in every format without throwing", () => {
    for (const f of FORMATS) {
      const { content } = serialize(realDatasets, f.id);
      expect(content.length).toBeGreaterThan(0);
    }
    // JSON output for the whole registry must parse back.
    const parsed = JSON.parse(toJSON(realDatasets));
    expect(Object.keys(parsed).length).toBe(realDatasets.length);
  });

  it("every JSONL line of the full registry parses as JSON", () => {
    for (const line of toJSONL(realDatasets).split("\n")) {
      expect(() => JSON.parse(line)).not.toThrow();
    }
  });
});
