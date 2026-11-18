/**
 * Tool logos for the scrolling strip and skill chips.
 * Logos: devicon (MIT) and simple-icons (CC0) in /public/logos.
 * Power BI, Excel and Tableau are simplified marks drawn for this site;
 * tools without a free logo get a brand-coloured monogram.
 */
export type Tool = {
  name: string;
  /** file in /public/logos */
  logo?: string;
  /** monogram fallback */
  mono?: { text: string; bg: string; fg?: string };
  /** dark logo that needs a light tile behind it */
  lightTile?: boolean;
};

const t = (name: string, logo: string, lightTile = false): Tool => ({ name, logo: `/logos/${logo}.svg`, lightTile });
const m = (name: string, text: string, bg: string, fg = "#fff"): Tool => ({ name, mono: { text, bg, fg } });

export const tools = {
  python: t("Python", "python"),
  pandas: t("pandas", "pandas", true),
  numpy: t("NumPy", "numpy"),
  sklearn: t("scikit-learn", "scikitlearn"),
  xgboost: m("XGBoost", "XG", "#1a5b8e"),
  lightgbm: m("LightGBM", "LG", "#2e7d32"),
  tensorflow: t("TensorFlow", "tensorflow"),
  keras: t("Keras", "keras"),
  opencv: t("OpenCV", "opencv"),
  matplotlib: t("Matplotlib", "matplotlib"),
  seaborn: t("Seaborn", "seaborn"),
  streamlit: t("Streamlit", "streamlit"),
  jupyter: t("Jupyter", "jupyter"),
  colab: t("Google Colab", "googlecolab"),
  mysql: t("MySQL", "mysql"),
  sqlserver: t("SQL Server", "microsoftsqlserver"),
  powerbi: t("Power BI", "powerbi"),
  tableau: t("Tableau", "tableau"),
  sas: m("SAS Viya", "SAS", "#0766d1"),
  pentaho: m("Pentaho", "P", "#e2711d"),
  excel: t("Excel", "excel"),
  sheets: t("Google Sheets", "googlesheets"),
  sap: t("SAP", "sap"),
  git: t("Git", "git"),
  github: t("GitHub", "github", true),
  vscode: t("VS Code", "vscode"),
  csharp: t("C#", "csharp"),
  dotnet: t(".NET", "dotnetcore"),
} satisfies Record<string, Tool>;

/** Two rows for the hero strip: data science stack / BI, data & dev tools */
export const toolRows: Tool[][] = [
  [
    tools.python,
    tools.pandas,
    tools.numpy,
    tools.sklearn,
    tools.xgboost,
    tools.lightgbm,
    tools.tensorflow,
    tools.keras,
    tools.opencv,
    tools.matplotlib,
    tools.seaborn,
    tools.streamlit,
    tools.jupyter,
    tools.colab,
  ],
  [
    tools.powerbi,
    tools.tableau,
    tools.sas,
    tools.pentaho,
    tools.mysql,
    tools.sqlserver,
    tools.excel,
    tools.sheets,
    tools.sap,
    tools.git,
    tools.github,
    tools.vscode,
    tools.csharp,
    tools.dotnet,
  ],
];

/** Lookup by display name, for skill chips */
const byName = new Map<string, Tool>(
  Object.values(tools).flatMap((tool) => [
    [tool.name.toLowerCase(), tool],
  ]),
);
const aliases: Record<string, string> = {
  "tensorflow / keras": "tensorflow",
  "matplotlib / seaborn": "matplotlib",
  sas: "sas viya",
  "pentaho data integration": "pentaho",
  "windows forms": "c#",
  ".net framework": ".net",
  "sap analytics cloud": "sap",
};
export function toolFor(name: string): Tool | undefined {
  const key = name.toLowerCase();
  return byName.get(key) ?? byName.get(aliases[key] ?? "");
}
