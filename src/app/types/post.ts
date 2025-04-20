// src/app/types/post.ts

export interface CreatePostRequest {
    nickname: string;
    title: string;
    content: string;
    email?: string;
    mood?: string;
    postId?: string;
  }
  