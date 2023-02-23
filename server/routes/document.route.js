const DocumentController = require('../controllers/Document.controller');
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {

    //general Document crud, has authentication to check for cookie before processing
    app.get('/api/document', DocumentController.getAllDocuments);
    app.get('/api/document/:id', DocumentController.getDocument);
    app.put('/api/document/:id', authenticate, DocumentController.updateDocument);
    app.post('/api/document', authenticate, DocumentController.createDocument);
    app.post('/api/document/creator', authenticate, DocumentController.getDocumentByCreator);
    app.delete('/api/document/:id', authenticate, DocumentController.deleteDocument);
}