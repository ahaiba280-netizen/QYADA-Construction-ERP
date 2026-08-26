import { Router } from 'express';
import { getDocuments, getDocumentById, uploadDocument, deleteDocument } from '../controllers/documentController';

const router = Router();

router.get('/', getDocuments);
router.get('/:id', getDocumentById);
router.post('/upload', uploadDocument);
router.delete('/:id', deleteDocument);

export default router;
