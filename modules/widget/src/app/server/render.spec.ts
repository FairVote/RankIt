import { fakeAsync } from '@angular/core/testing';

import { renderWidget } from './render';

describe('renderWidget', () => {
  beforeEach(() => {

  });


  it('should return something', fakeAsync(() => {
    renderWidget('foobar').then(result => {
      expect(result).toBeDefined();
    });

  }))
});
