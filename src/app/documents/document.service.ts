import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[];
  documentsListClone: Document[];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
        return this.documents.slice();
       }
  
  getDocument(id: string): Document {     
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document){
    if (!newDocument){
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);  
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);
  }

  deleteDocument(document: Document) {
    if (!document) {
        return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
        return;
    }
    this.documents.splice(pos, 1);
    this.documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(this.documentsListClone);
  }

}
