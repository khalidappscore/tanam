
export type DocumentStatus = 'published' | 'unpublished' | 'scheduled';

export interface Document {
  id: string; // Document id
  documentType: string;
  data: { [key: string]: any }; // The content data to render into templates
  title: string;  // Presentation title for browser window title and content listings
  url: string;
  revision: number | any; // firebase.firestore.FieldValue.increment;
  status: DocumentStatus;
  tags: string[];
  standalone: boolean;
  dependencies: string[] | any; // Array of ids for documents that are referred to by this document
  rendered?: any; // firebase.firestore.Timestamp | firebase.firestore.FieldValue.serverTimestamp;
  published?: any; // firebase.firestore.Timestamp | firebase.firestore.FieldValue.serverTimestamp;
  canonicalUrl?: string;
  updated: any; // firebase.firestore.Timestamp | firebase.firestore.FieldValue.serverTimestamp;
  created: any; // firebase.firestore.Timestamp | firebase.firestore.FieldValue.serverTimestamp;
}
