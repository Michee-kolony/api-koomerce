const http = require('http');
const app = require('./app');
const WebSocket = require('ws');

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

// 🔥 Création du serveur WebSocket
const wss = new WebSocket.Server({ server });

// Stocker les clients connectés
let clients = [];

wss.on('connection', (ws) => {
  console.log('🟢 Client connecté WebSocket');

  clients.push(ws);

  ws.on('close', () => {
    console.log('🔴 Client déconnecté');
    clients = clients.filter(client => client !== ws);
  });
});

// Fonction globale pour envoyer notification
const sendNotification = (data) => {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// rendre accessible partout
app.set('sendNotification', sendNotification);

// Démarrage serveur
server.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});