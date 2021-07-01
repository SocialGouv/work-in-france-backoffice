import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils";
import { Probe } from "kubernetes-models/v1";

const livenessProbe = new Probe({
  httpGet: {
    port: "http",
    path: "/api/liveness",
  },
});
const readinessProbe = new Probe({
  httpGet: {
    port: "http",
    path: "/api/readiness",
  },
});
const manifests = create("api", {
  env,
  config: {
    containerPort: 4000,
    image: getHarborImagePath({ name: "work-in-france-backoffice" }),
  },
  deployment: {
    container: {
      resources: {},
      livenessProbe,
      readinessProbe: readinessProbe,
      startupProbe: livenessProbe,
    },
  },
});

export default manifests;
