import { ComponentFixture } from "@angular/core/testing";
import { findEl } from "./find-element.helper";

export function click<T>(
  fixture: ComponentFixture<T>,
  testId: string
): void {
  const element = findEl(fixture, testId);
  element.triggerEventHandler('click');
}