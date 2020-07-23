# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.3](https://github.com/SocialGouv/work-in-france-backoffice/compare/v2.0.2...v2.0.3) (2020-07-23)

**Note:** Version bump only for package api





## [2.0.2](https://github.com/SocialGouv/work-in-france-backoffice/compare/v2.0.1...v2.0.2) (2020-07-23)

**Note:** Version bump only for package api





## [2.0.1](https://github.com/SocialGouv/work-in-france-backoffice/compare/v2.0.0...v2.0.1) (2020-07-21)

**Note:** Version bump only for package api





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

* **docker-compose:** use correct ports ([1efb6f2](https://github.com/SocialGouv/work-in-france-backoffice/commit/1efb6f2))
* **test:** set ENVIRONMENT_TYPE default value ([8838c9e](https://github.com/SocialGouv/work-in-france-backoffice/commit/8838c9e))


### Features

* **alert:** add API to delete and sync alerts ([7d0bb90](https://github.com/SocialGouv/work-in-france-backoffice/commit/7d0bb90))
* **alert:** add properties and export them ([e4f444f](https://github.com/SocialGouv/work-in-france-backoffice/commit/e4f444f))
* **alert:** block alert at creation if it should be ([d801b16](https://github.com/SocialGouv/work-in-france-backoffice/commit/d801b16))
* **alert:** handle alert email send state ([331c318](https://github.com/SocialGouv/work-in-france-backoffice/commit/331c318))
* **alert:** make email optional ([3439f69](https://github.com/SocialGouv/work-in-france-backoffice/commit/3439f69))
* **alert:** update blocked email conditions ([1915684](https://github.com/SocialGouv/work-in-france-backoffice/commit/1915684))
* **email:** handle attachments ([f31e6c0](https://github.com/SocialGouv/work-in-france-backoffice/commit/f31e6c0))
* **excel:** export email alert in excel ([b2eaeaa](https://github.com/SocialGouv/work-in-france-backoffice/commit/b2eaeaa))
* **excel:** export email in alert excel ([72df69a](https://github.com/SocialGouv/work-in-france-backoffice/commit/72df69a))
* **excel:** remove email export in alert excel ([cdb3909](https://github.com/SocialGouv/work-in-france-backoffice/commit/cdb3909))
* **mail:** enabled email sending in prod environment ([c80356f](https://github.com/SocialGouv/work-in-france-backoffice/commit/c80356f))
* **timezone:** set timezone ([#5](https://github.com/SocialGouv/work-in-france-backoffice/issues/5)) ([23b31fd](https://github.com/SocialGouv/work-in-france-backoffice/commit/23b31fd))
* **validity-check:** decrease merge map concurrency ([d44ee49](https://github.com/SocialGouv/work-in-france-backoffice/commit/d44ee49))
