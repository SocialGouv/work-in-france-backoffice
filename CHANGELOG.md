# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.5](https://github.com/SocialGouv/work-in-france-backoffice/compare/v2.0.4...v2.0.5) (2020-07-27)


### Bug Fixes

* **k8s:** update prod api-env secrets (3) ([5f45245](https://github.com/SocialGouv/work-in-france-backoffice/commit/5f4524578cf6603984cd32e3b51a6fb3e0ec77f8))





## [2.0.4](https://github.com/SocialGouv/work-in-france-backoffice/compare/v2.0.3...v2.0.4) (2020-07-23)


### Bug Fixes

* **k8s:** update prod api-env configmap (2) ([334bbe7](https://github.com/SocialGouv/work-in-france-backoffice/commit/334bbe7c8eaf4320f213dffce0644af8bc8be407))





## [2.0.3](https://github.com/SocialGouv/work-in-france-backoffice/compare/v2.0.2...v2.0.3) (2020-07-23)


### Bug Fixes

* **k8s:** update prod api-env (5) ([54036d7](https://github.com/SocialGouv/work-in-france-backoffice/commit/54036d7d87566988cd4390ee974fa6773a5776d6))
* **k8s:** update prod api-env configmap ([852ffb4](https://github.com/SocialGouv/work-in-france-backoffice/commit/852ffb4091d3dc87c5705ddc04ef512b1b1a4276))





## [2.0.2](https://github.com/SocialGouv/work-in-france-backoffice/compare/v2.0.1...v2.0.2) (2020-07-23)


### Bug Fixes

* **k8s:** update prod api-env (3) ([8e0d4d0](https://github.com/SocialGouv/work-in-france-backoffice/commit/8e0d4d0fe391f20d4326d31eab4b130f8dfa07f3))
* **k8s:** update prod api-env (4) ([ca50e90](https://github.com/SocialGouv/work-in-france-backoffice/commit/ca50e90998618fedf6987982ed773756083696d5))





## [2.0.1](https://github.com/SocialGouv/work-in-france-backoffice/compare/v2.0.0...v2.0.1) (2020-07-21)


### Bug Fixes

* trigger release ([16b0cea](https://github.com/SocialGouv/work-in-france-backoffice/commit/16b0cea0156e9e6fd6bbf1dd07f89ac30128d6f3))





# [2.0.0](https://github.com/SocialGouv/work-in-france-backoffice/compare/v1.1.5...v2.0.0) (2020-07-21)


* feat(knex)!: kill kinto (#18) ([8e79a43](https://github.com/SocialGouv/work-in-france-backoffice/commit/8e79a431f5b8a8043045095ef52764bccedad9a9)), closes [#18](https://github.com/SocialGouv/work-in-france-backoffice/issues/18)


### BREAKING CHANGES

* use knex instead of kinto

Co-authored-by: Douglas Duteil <douglasduteil@gmail.com>





## [1.1.5](https://github.com/SocialGouv/work-in-france-backoffice/compare/v1.1.4...v1.1.5) (2019-11-01)


### Bug Fixes

* **alert-email:** use filter insteadof NEVER to avoid blocking stream ([8d4142f](https://github.com/SocialGouv/work-in-france-backoffice/commit/8d4142f))





## [1.1.4](https://github.com/SocialGouv/work-in-france-backoffice/compare/v1.1.3...v1.1.4) (2019-10-31)


### Bug Fixes

* **scheduler:** update last time execution ([f194115](https://github.com/SocialGouv/work-in-france-backoffice/commit/f194115))





## [1.1.3](https://github.com/SocialGouv/work-in-france-backoffice/compare/v1.1.2...v1.1.3) (2019-10-30)


### Bug Fixes

* **validity-check:** do not throw error if prenom is not defined ([9ca9d3f](https://github.com/SocialGouv/work-in-france-backoffice/commit/9ca9d3f))





## [1.1.2](https://github.com/SocialGouv/work-in-france-backoffice/compare/v1.1.1...v1.1.2) (2019-07-02)


### Bug Fixes

* **api:** make validity-check API compatible with frontend ([c4ffaf8](https://github.com/SocialGouv/work-in-france-backoffice/commit/c4ffaf8))





## [1.1.1](https://github.com/SocialGouv/work-in-france-backoffice/compare/v1.1.0...v1.1.1) (2019-07-02)


### Bug Fixes

* **sync:** use last_modified instead of update_at / processed_at ([1fd2e47](https://github.com/SocialGouv/work-in-france-backoffice/commit/1fd2e47))





# 1.1.0 (2019-06-25)


### Bug Fixes

* **monthly-report:** fix test to define for more or less 3 months ([7210b48](https://github.com/SocialGouv/work-in-france-backoffice/commit/7210b48))
* build ([24aa525](https://github.com/SocialGouv/work-in-france-backoffice/commit/24aa525))
* **config:** use right param ([56e873b](https://github.com/SocialGouv/work-in-france-backoffice/commit/56e873b))
* **docker-compose:** use correct ports ([1efb6f2](https://github.com/SocialGouv/work-in-france-backoffice/commit/1efb6f2))
* **env:** use correct env variables for kinto init ([941a93e](https://github.com/SocialGouv/work-in-france-backoffice/commit/941a93e))
* **lint:** fix all problems ([#3](https://github.com/SocialGouv/work-in-france-backoffice/issues/3)) ([5e9adac](https://github.com/SocialGouv/work-in-france-backoffice/commit/5e9adac))
* **log:** log right email message id ([f5a9686](https://github.com/SocialGouv/work-in-france-backoffice/commit/f5a9686))
* **monthly-report:** fix report computation ([340961b](https://github.com/SocialGouv/work-in-france-backoffice/commit/340961b))
* **monthly-report:** fix test to define for more or less 3 months ([083e287](https://github.com/SocialGouv/work-in-france-backoffice/commit/083e287))
* **sentry:** sentry activation ([192df01](https://github.com/SocialGouv/work-in-france-backoffice/commit/192df01))
* **test:** set ENVIRONMENT_TYPE default value ([8838c9e](https://github.com/SocialGouv/work-in-france-backoffice/commit/8838c9e))
* **validity-check:** return correct date fin APT ([5e7188c](https://github.com/SocialGouv/work-in-france-backoffice/commit/5e7188c))
* **validity-checks:** deletion ([054f3d8](https://github.com/SocialGouv/work-in-france-backoffice/commit/054f3d8))


### Features

* **alert:** add API to delete and sync alerts ([7d0bb90](https://github.com/SocialGouv/work-in-france-backoffice/commit/7d0bb90))
* **alert:** add api to download all alerts in xlsx ([1a7d9c1](https://github.com/SocialGouv/work-in-france-backoffice/commit/1a7d9c1))
* **alert:** add properties and export them ([e4f444f](https://github.com/SocialGouv/work-in-france-backoffice/commit/e4f444f))
* **alert:** add url ([edd215e](https://github.com/SocialGouv/work-in-france-backoffice/commit/edd215e))
* **alert:** block alert at creation if it should be ([d801b16](https://github.com/SocialGouv/work-in-france-backoffice/commit/d801b16))
* **alert:** handle alert email send state ([331c318](https://github.com/SocialGouv/work-in-france-backoffice/commit/331c318))
* **alert:** implement alerts, model, repo, service, api ([ae09bb4](https://github.com/SocialGouv/work-in-france-backoffice/commit/ae09bb4))
* **alert:** make email optional ([3439f69](https://github.com/SocialGouv/work-in-france-backoffice/commit/3439f69))
* **alert:** message with response is not an alert ([20df4e4](https://github.com/SocialGouv/work-in-france-backoffice/commit/20df4e4))
* **alert:** remove no instructor rule ([bd98cf3](https://github.com/SocialGouv/work-in-france-backoffice/commit/bd98cf3))
* **alert:** split creation and sending schedulers ([6b557e4](https://github.com/SocialGouv/work-in-france-backoffice/commit/6b557e4))
* **alert:** update blocked email conditions ([1915684](https://github.com/SocialGouv/work-in-france-backoffice/commit/1915684))
* **alert-email:** sent alert email ([65b59e3](https://github.com/SocialGouv/work-in-france-backoffice/commit/65b59e3))
* **db:** add kinto as lerna package ([d1ef410](https://github.com/SocialGouv/work-in-france-backoffice/commit/d1ef410))
* **delete:** allow deleting all records ([7cd22c0](https://github.com/SocialGouv/work-in-france-backoffice/commit/7cd22c0))
* **email:** add email sending with nodemailer ([c94987c](https://github.com/SocialGouv/work-in-france-backoffice/commit/c94987c))
* **email:** handle attachments ([f31e6c0](https://github.com/SocialGouv/work-in-france-backoffice/commit/f31e6c0))
* **excel:** export email alert in excel ([b2eaeaa](https://github.com/SocialGouv/work-in-france-backoffice/commit/b2eaeaa))
* **excel:** export email in alert excel ([72df69a](https://github.com/SocialGouv/work-in-france-backoffice/commit/72df69a))
* **excel:** remove email export in alert excel ([cdb3909](https://github.com/SocialGouv/work-in-france-backoffice/commit/cdb3909))
* **kinto:** add scripts to dump, load data with kinto wizard ([c7bf2f2](https://github.com/SocialGouv/work-in-france-backoffice/commit/c7bf2f2))
* **mail:** enabled email sending in prod environment ([c80356f](https://github.com/SocialGouv/work-in-france-backoffice/commit/c80356f))
* **mailjet:** add mailjet support ([b4d616a](https://github.com/SocialGouv/work-in-france-backoffice/commit/b4d616a))
* **monthly-report:** create and store monthly-reports ([4f27f63](https://github.com/SocialGouv/work-in-france-backoffice/commit/4f27f63))
* **monthly-report:** generate and send monthly report in the same scheduler ([04a1e22](https://github.com/SocialGouv/work-in-france-backoffice/commit/04a1e22))
* **monthly-report:** generate report in xlsx ([37e1d35](https://github.com/SocialGouv/work-in-france-backoffice/commit/37e1d35))
* **monthly-report:** implement api returning xlsx ([ce443c0](https://github.com/SocialGouv/work-in-france-backoffice/commit/ce443c0))
* **monthly-report:** send email ([8aa5ff7](https://github.com/SocialGouv/work-in-france-backoffice/commit/8aa5ff7))
* **procedure-config:** handle procedure config ([6ef3d59](https://github.com/SocialGouv/work-in-france-backoffice/commit/6ef3d59))
* **report:**  start implementing monthly report ([3dd5877](https://github.com/SocialGouv/work-in-france-backoffice/commit/3dd5877))
* **report:** catch exception ([191370b](https://github.com/SocialGouv/work-in-france-backoffice/commit/191370b))
* **report:** export list of refused dossiers ([2ade318](https://github.com/SocialGouv/work-in-france-backoffice/commit/2ade318))
* **scheduler:** add alert scheduler ([324dd70](https://github.com/SocialGouv/work-in-france-backoffice/commit/324dd70))
* **sentry:** add sentry support ([139f0dd](https://github.com/SocialGouv/work-in-france-backoffice/commit/139f0dd))
* **synchro-history:** add synchro history and scheduler ([464a213](https://github.com/SocialGouv/work-in-france-backoffice/commit/464a213))
* **timezone:** set timezone ([#5](https://github.com/SocialGouv/work-in-france-backoffice/issues/5)) ([23b31fd](https://github.com/SocialGouv/work-in-france-backoffice/commit/23b31fd))
* **validity-check:** add cleaning scheduler ([aee611a](https://github.com/SocialGouv/work-in-france-backoffice/commit/aee611a))
* **validity-check:** add node cron to schedule synchro ([3766d2b](https://github.com/SocialGouv/work-in-france-backoffice/commit/3766d2b))
* **validity-check:** add validity checks logic ([0385008](https://github.com/SocialGouv/work-in-france-backoffice/commit/0385008))
* **validity-check:** decrease merge map concurrency ([d44ee49](https://github.com/SocialGouv/work-in-france-backoffice/commit/d44ee49))
* **validity-checks:** sync validity checks ([cf9b99b](https://github.com/SocialGouv/work-in-france-backoffice/commit/cf9b99b))
* add alert if instrustor is not defined ([e28edf0](https://github.com/SocialGouv/work-in-france-backoffice/commit/e28edf0))
* add util, lib, config directories ([0913b6a](https://github.com/SocialGouv/work-in-france-backoffice/commit/0913b6a))
* handling error ([bec6933](https://github.com/SocialGouv/work-in-france-backoffice/commit/bec6933))
