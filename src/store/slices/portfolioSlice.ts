import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PortfolioContent } from "../../types";
import { defaultContent } from "../../data";

function loadState(): PortfolioContent {
  try {
    const saved = window.localStorage.getItem("fullstack-portfolio-cms");
    if (!saved) return defaultContent;
    const parsed = JSON.parse(saved) as PortfolioContent;
    return {
      ...defaultContent,
      ...parsed,
      greeting: { ...defaultContent.greeting, ...parsed.greeting },
      projects: (parsed.projects ?? defaultContent.projects).map((project) => ({
        ...project,
        githubLinks: project.githubLinks?.length
          ? project.githubLinks
          : project.github
            ? [{ id: "github", label: "GitHub", url: project.github }]
            : [],
      })),
      theme: {
        ...defaultContent.theme,
        ...parsed.theme,
        sections: Object.fromEntries(
          (Object.keys(defaultContent.theme.sections) as Array<keyof typeof defaultContent.theme.sections>).map((key) => [
            key,
            { ...defaultContent.theme.sections[key], ...parsed.theme?.sections?.[key] },
          ]),
        ) as typeof defaultContent.theme.sections,
      },
    };
  } catch {
    return defaultContent;
  }
}

const initialState: PortfolioContent = loadState();

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setHero(state, action: PayloadAction<Partial<PortfolioContent["hero"]>>) {
      state.hero = { ...state.hero, ...action.payload };
    },
    setAbout(state, action: PayloadAction<Partial<PortfolioContent["about"]>>) {
      state.about = { ...state.about, ...action.payload };
    },
    setSkills(state, action: PayloadAction<PortfolioContent["skills"]>) {
      state.skills = action.payload;
    },
    setExperiences(state, action: PayloadAction<PortfolioContent["experience"]>) {
      state.experience = action.payload;
    },
    setProjects(state, action: PayloadAction<PortfolioContent["projects"]>) {
      state.projects = action.payload;
    },
    setEducation(state, action: PayloadAction<PortfolioContent["education"]>) {
      state.education = action.payload;
    },
    setReviews(state, action: PayloadAction<PortfolioContent["reviews"]>) {
      state.reviews = action.payload;
    },
    setBlogs(state, action: PayloadAction<PortfolioContent["blogs"]>) {
      state.blogs = action.payload;
    },
    setContact(state, action: PayloadAction<Partial<PortfolioContent["contact"]>>) {
      state.contact = { ...state.contact, ...action.payload };
    },
    setGreeting(state, action: PayloadAction<Partial<PortfolioContent["greeting"]>>) {
      state.greeting = { ...state.greeting, ...action.payload };
    },
    setTheme(state, action: PayloadAction<Partial<PortfolioContent["theme"]>>) {
      state.theme = { ...state.theme, ...action.payload };
    },
    setSectionTheme(
      state,
      action: PayloadAction<{ section: keyof PortfolioContent["theme"]["sections"]; field: string; value: string }>,
    ) {
      const { section, field, value } = action.payload;
      state.theme.sections[section] = { ...state.theme.sections[section], [field]: value };
    },
    resetToDefault() {
      return defaultContent;
    },
  },
});

export const {
  setHero,
  setAbout,
  setSkills,
  setExperiences,
  setProjects,
  setEducation,
  setReviews,
  setBlogs,
  setContact,
  setGreeting,
  setTheme,
  setSectionTheme,
  resetToDefault,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
