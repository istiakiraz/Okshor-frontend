export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  parentId: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
}
