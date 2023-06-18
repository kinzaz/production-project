import { classNames } from './classNames';

describe('classNames', () => {
  it('with only first param', () => {
    expect(classNames('someClass')).toBe('someClass');
  });

  it('with additional class', () => {
    const expected = 'someClass class1 class2';
    expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(expected);
  });

  it('with mods', () => {
    const expected = 'someClass class1 class2 hovered scrollable';
    expect(
      classNames('someClass', { hovered: true, scrollable: true }, [
        'class1',
        'class2',
      ])
    ).toBe(expected);
  });

  it('with mods false', () => {
    const expected = 'someClass class1 class2 scrollable';
    expect(
      classNames('someClass', { hovered: false, scrollable: true }, [
        'class1',
        'class2',
      ])
    ).toBe(expected);
  });

  it('with mods undefined', () => {
    const expected = 'someClass class1 class2 hovered';
    expect(
      classNames('someClass', { hovered: true, scrollable: undefined }, [
        'class1',
        'class2',
      ])
    ).toBe(expected);
  });

  it('with classname undefined', () => {
    const expected = 'class1 class2 hovered scrollable';
    expect(
      classNames(undefined, { hovered: true, scrollable: true }, [
        'class1',
        'class2',
      ])
    ).toBe(expected);
  });
});
