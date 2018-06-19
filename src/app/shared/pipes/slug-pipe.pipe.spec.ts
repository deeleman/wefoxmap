import { SlugPipe } from './slug.pipe';

describe('SlugPipe', () => {
  it('create an instance', () => {
    const pipe = new SlugPipe();
    expect(pipe).toBeTruthy();
  });

  it('slugifies a string correctly', () => {
    const pipe = new SlugPipe();
    expect(pipe.transform('Hello World')).toEqual('hello-world');
  });

  it('slugifies a string with custom separator char', () => {
    const pipe = new SlugPipe();
    expect(pipe.transform('Hello World', '_')).toEqual('hello_world');
  });
});
