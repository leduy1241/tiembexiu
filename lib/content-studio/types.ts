export type StudioSettings = {
  openaiApiKey: string;
  facebookPageId: string;
  facebookAccessToken: string;
  intervalMinutes: number;
  contentModel: string;
  imageModel: string;
  brandVoice: string;
  topics: string;
  autoPublish: boolean;
};

export type StudioPost = {
  id: string;
  createdAt: string;
  status: "published" | "draft" | "failed" | "generating";
  title: string;
  content: string;
  idea: string;
  imagePrompt: string;
  imageUrl?: string;
  facebookPostId?: string;
  error?: string;
};

export type PublicSettings = Omit<StudioSettings, "openaiApiKey" | "facebookAccessToken"> & {
  hasOpenaiApiKey: boolean;
  hasFacebookAccessToken: boolean;
};
