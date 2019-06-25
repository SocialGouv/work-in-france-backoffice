import { addDays } from "date-fns";
import { alertEmailShouldBeBlocked } from "../../../src/model";

it("email should be blocked", () => {
  expect(alertEmailShouldBeBlocked(null, null)).toBeTruthy();
  expect(alertEmailShouldBeBlocked("sent", null)).toBeTruthy();
  expect(alertEmailShouldBeBlocked("blocked", null)).toBeTruthy();
  expect(
    alertEmailShouldBeBlocked("to_send", addDays(new Date(), -3).getTime())
  ).toBeTruthy();
});

it("email should not be blocked", () => {
  expect(alertEmailShouldBeBlocked("to_send", null)).toBeFalsy();
  expect(
    alertEmailShouldBeBlocked("to_send", addDays(new Date(), -1).getTime())
  ).toBeFalsy();
});
