import { alertService } from "../../../../src/service/alert";
import { DossierRecord } from "../../../../src/model";

const dossier = {
  id: 502017,
  // tslint:disable-next-line: object-literal-sort-keys
  created_at: "2019-05-21T11:46:31.074Z",
  updated_at: "2019-05-22T13:59:34.657Z",
  archived: false,
  email: "usager@wif.fr",
  state: "closed",
  simplified_state: "Accepté",
  initiated_at: "2019-05-21T12:02:11.223Z",
  received_at: "2019-05-22T13:50:55.978Z",
  processed_at: "2019-05-22T13:52:15.191Z",
  motivation: "",
  instructeurs: ["instructor@wif.fr"],
  individual: null,

  etablissement: {
    siret: "SIRET"
  },
  cerfa: [],
  commentaires: [],
  champs_private: [],
  pieces_justificatives: [],
  types_de_piece_justificative: [],
  justificatif_motivation: null,
  champs: []
};

const record: DossierRecord = {
  ds_key: "14131-502017",
  metadata: {
    group: {
      type: "autorisation",
      id: "75",
      label: "75 - Paris"
    },
    state: "closed",
    // tslint:disable-next-line: object-literal-sort-keys
    created_at: 1558439191074,
    updated_at: 1558533574657,
    received_at: 1558533055978,
    initiated_at: 1558440131223,
    procedure_id: 14131,
    processed_at: 1558533135191,
    instructors_history: ["instructor@wif.fr"]
  },
  // tslint:disable-next-line: object-literal-sort-keys
  ds_data: dossier
};

it("alert should be equal to 'closedWithDebutSupFin'", () => {
  const dossierData = {
    ...dossier,
    champs_private: [
      {
        type_de_champ: {
          libelle: "Date de début APT"
        },
        value: "2019-10-31"
      },
      {
        type_de_champ: {
          libelle: "Date de fin APT"
        },
        value: "2018-12-31"
      }
    ]
  };
  const data = { ...record, ds_data: dossierData };

  const alerts = alertService.getAlerts(data);
  expect(alerts.length).toEqual(1);
  expect(alerts[0].alert_type).toEqual("closedWithDebutSupFin");
});

it("alert should be equal to 'closedWithoutDateDebutOrDateFin'", () => {
  const dossierData = {
    ...dossier,
    champs_private: [
      {
        type_de_champ: {
          libelle: "Date de début APT"
        },
        value: "2019-10-31"
      },
      {
        type_de_champ: {
          libelle: "Date de fin APT"
        },
        value: ""
      }
    ]
  };
  const data = { ...record, ds_data: dossierData };

  const alerts = alertService.getAlerts(data);
  expect(alerts.length).toEqual(1);
  expect(alerts[0].alert_type).toEqual("closedWithoutDateDebutOrDateFin");
});

it("alert should be equal to 'closedWithoutDateDebutOrDateFin'", () => {
  const dossierData = {
    ...dossier,
    champs_private: [
      {
        type_de_champ: {
          libelle: "Date de début APT"
        },
        value: ""
      },
      {
        type_de_champ: {
          libelle: "Date de fin APT"
        },
        value: "2018-12-31"
      }
    ]
  };
  const data = { ...record, ds_data: dossierData };

  const alerts = alertService.getAlerts(data);
  expect(alerts.length).toEqual(1);
  expect(alerts[0].alert_type).toEqual("closedWithoutDateDebutOrDateFin");
});

it("alert should be equal to 'closedWithSupOneYear'", () => {
  const dossierData = {
    ...dossier,
    champs_private: [
      {
        type_de_champ: {
          libelle: "Date de début APT"
        },
        value: "2018-01-01"
      },
      {
        type_de_champ: {
          libelle: "Date de fin APT"
        },
        value: "2019-02-01"
      }
    ]
  };
  const data = { ...record, ds_data: dossierData };

  const alerts = alertService.getAlerts(data);
  expect(alerts.length).toEqual(1);
  expect(alerts[0].alert_type).toEqual("closedWithSupOneYear");
});

it("alerts should be equal to empty", () => {
  const dossierData = {
    ...dossier,
    champs_private: [
      {
        type_de_champ: {
          libelle: "Date de début APT"
        },
        value: "2018-01-01"
      },
      {
        type_de_champ: {
          libelle: "Date de fin APT"
        },
        value: "2018-10-20"
      }
    ]
  };
  const data = { ...record, ds_data: dossierData };

  const alerts = alertService.getAlerts(data);
  expect(alerts.length).toEqual(0);
});
