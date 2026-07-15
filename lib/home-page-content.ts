import { promises as fs } from "fs";
import path from "path";
import { homePageConfig, type HomePageConfig } from "@/data/home-page";

const homePagePath = path.join(process.cwd(), "data", "home-page.json");

export async function readHomePageConfig(): Promise<HomePageConfig> {
  try {
    const content = await fs.readFile(homePagePath, "utf8");
    return JSON.parse(content) as HomePageConfig;
  } catch {
    return homePageConfig;
  }
}
