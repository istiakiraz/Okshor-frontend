// export interface BlogPost {
//   id: string;
//   title: string;
//   content: string;
//   thumbnail?: string | null;
//   tags?: string[] | undefined;
//   views: number;
//   _count?: {
//     comments: number;
//   };
//   isFeatured?: boolean;
// }

// types/index.ts
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  isFeatured: boolean;
  status: string;
  tags?: string[]; // Optional kore dilam (?)
  view: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {      // Optional kore dilam (?)
    comments: number;
  };
}
