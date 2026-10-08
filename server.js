const http = require('http');

const PORT = process.env.PORT || 8080;
const APP_VERSION = process.env.APP_VERSION || 'v1.0.4';
const ENVIRONMENT = process.env.ENVIRONMENT || 'dev-eks';

const server = http.createServer((req, res) => {
  if (req.url === '/health' || req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: 'UP',
      timestamp: new Date().toISOString(),
      version: APP_VERSION,
      service: 'cargill-order-service',
      environment: ENVIRONMENT,
      checks: {
        database: 'HEALTHY',
        artifactory_connectivity: 'CONNECTED'
      }
    }));
  }

  if (req.url === '/api/orders') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify([
      { id: 'ORD-9021', grain: 'Wheat', quantityTons: 1500, status: 'DISPATCHED' },
      { id: 'ORD-9022', grain: 'Corn', quantityTons: 2800, status: 'PROCESSING' }
    ]));
  }

  // Root endpoint
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Welcome to Cargill Supply Chain Order Service',
    deployedVia: 'Harness CD + Kubernetes EKS',
    version: APP_VERSION,
    environment: ENVIRONMENT
  }));
});

server.listen(PORT, () => {
  console.log(`Cargill Order Service ${APP_VERSION} listening on port ${PORT} [${ENVIRONMENT}]`);
});
