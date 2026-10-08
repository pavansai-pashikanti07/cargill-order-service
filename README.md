# Cargill Order Service - Build Repository (CI)

This repository represents the **Application Build Repository** maintained for Cargill's Supply Chain order processing microservice.

## Repository Responsibilities:
1. **Source Code**: Microservice application code (`server.js`).
2. **Containerization**: `Dockerfile` packaging the microservice with production health checks.
3. **Continuous Integration**: GitHub Actions workflow (`.github/workflows/ci-pipeline.yml`) performing:
   - Code quality & unit testing.
   - SonarQube quality gate verification.
   - Container image build with immutable tag: `v1.0.4-<git-commit-sha>`.
   - JFrog Xray pre-deployment vulnerability scan.
   - Pushing the artifact to JFrog Artifactory.
   - Sending the deployment payload directly to **Harness CD** to trigger continuous delivery.

## GitOps Architecture:
This repository only handles building and validating artifacts. All Kubernetes infrastructure manifests and deployment logic are decoupled and maintained in the companion repository: `cargill-k8s-manifests`.
