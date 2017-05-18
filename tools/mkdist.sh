#/bin/bash

rimraf tmp dist && \
echo 'Inlining...' &&  ts-node tools/inliner.ts && \
echo 'Sourcing...' && cp lib/angular-basic-modal.module.ts lib/base-modal-config.ts lib/basic-modal.service.ts lib/index.ts tmp/ && \
echo 'Transpiling...' && tsc -p tsconfig-esm.json && \
echo 'Rolling...' && rollup -c rollup.config.js dist/index.js > dist/angular-basic-modal.bundle.js && \
echo 'Angularizing...' && ngc -p tsconfig-esm.json && \
echo 'Packaging...' && ts-node tools/packager.ts && \
echo 'Licensing...' && cp README.md LICENSE dist
