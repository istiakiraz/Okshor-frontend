export interface BlogComment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  parentId: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  replies?: BlogComment[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  isFeatured: boolean;
  status: string;
  tags?: string[]; 
  view: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  comments?: BlogComment[];
  _count?: {
    
    comments: number;
  };
}
