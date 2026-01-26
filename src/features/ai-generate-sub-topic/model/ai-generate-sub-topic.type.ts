export type GenerateSubTopicRequest = {
  topic: string;
  level?: string;
};

export type GenerateSubTopicResponse = {
  result: {
    topic: string;
    level: string;
    subtopics: string[];
  };
};
