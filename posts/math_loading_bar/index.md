---
title: "Animating With Pen and Paper"
description: "I tried making a loading bar animation with pen, paper and a little calculus instead of just searching for an easing function."
publishDate: "2026 • 08"
tags: ["Math", "Web", "Coding"]
---

## It Was Just a Loading Bar

I was adding a loading bar to this website. I wanted it to start slowly, speed up in the middle and then slow down again before reaching the end.

I could have just searched for an animation online and copied it. But I wanted to understand the math behind that movement, so I took out a pen and paper and tried to DIY the function myself.

## Back to a Notebook

Let the progress be *f(t)*, where *t* goes from `0` to `1`.

The bar should start at `0` and end at `1`:

<div class="math-block">
<math display="block" aria-label="f of zero equals zero, and f of one equals one">
  <mtable columnalign="right center left" rowspacing="0.5em">
    <mtr>
      <mtd><mi>f</mi><mo>(</mo><mn>0</mn><mo>)</mo></mtd>
      <mtd><mo>=</mo></mtd>
      <mtd><mn>0</mn></mtd>
    </mtr>
    <mtr>
      <mtd><mi>f</mi><mo>(</mo><mn>1</mn><mo>)</mo></mtd>
      <mtd><mo>=</mo></mtd>
      <mtd><mn>1</mn></mtd>
    </mtr>
  </mtable>
</math>
</div>

I also wanted its speed to be zero at the start and the end:

<div class="math-block">
<math display="block" aria-label="f prime of zero equals zero, and f prime of one equals zero">
  <mtable columnalign="right center left" rowspacing="0.5em">
    <mtr>
      <mtd><msup><mi>f</mi><mo>′</mo></msup><mo>(</mo><mn>0</mn><mo>)</mo></mtd>
      <mtd><mo>=</mo></mtd>
      <mtd><mn>0</mn></mtd>
    </mtr>
    <mtr>
      <mtd><msup><mi>f</mi><mo>′</mo></msup><mo>(</mo><mn>1</mn><mo>)</mo></mtd>
      <mtd><mo>=</mo></mtd>
      <mtd><mn>0</mn></mtd>
    </mtr>
  </mtable>
</math>
</div>

Since speed is the derivative of progress, I called it *v(t)*. It had to be zero at `0` and `1`, but increase somewhere in between. The simplest shape I could try was a quadratic.

<div class="math-block">
<math display="block" aria-label="v of t equals f prime of t equals k times t minus r one times t minus r two">
  <mstyle displaystyle="true">
    <mtable columnalign="left" rowspacing="0.7em">
      <mtr>
        <mtd>
          <mi>v</mi><mo>(</mo><mi>t</mi><mo>)</mo>
          <mo>=</mo>
          <msup><mi>f</mi><mo>′</mo></msup><mo>(</mo><mi>t</mi><mo>)</mo>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mi>v</mi><mo>(</mo><mi>t</mi><mo>)</mo>
          <mo>=</mo>
          <mi>k</mi><mo>(</mo><mi>t</mi><mo>−</mo><msub><mi>r</mi><mn>1</mn></msub><mo>)</mo>
          <mo>(</mo><mi>t</mi><mo>−</mo><msub><mi>r</mi><mn>2</mn></msub><mo>)</mo>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <msub><mi>r</mi><mn>1</mn></msub><mo>=</mo><mn>0</mn>
          <mo>,</mo><mspace width="0.8em"/>
          <msub><mi>r</mi><mn>2</mn></msub><mo>=</mo><mn>1</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mi>v</mi><mo>(</mo><mi>t</mi><mo>)</mo>
          <mo>=</mo>
          <mi>k</mi><mi>t</mi><mo>(</mo><mi>t</mi><mo>−</mo><mn>1</mn><mo>)</mo>
        </mtd>
      </mtr>
    </mtable>
  </mstyle>
</math>
</div>

But this is negative between `0` and `1`. The progress needs to move forward, so I reversed it:

<div class="math-block">
<math display="block" aria-label="v of t equals k t times one minus t">
  <mi>v</mi><mo>(</mo><mi>t</mi><mo>)</mo>
  <mo>=</mo>
  <mi>k</mi><mi>t</mi><mo>(</mo><mn>1</mn><mo>−</mo><mi>t</mi><mo>)</mo>
</math>
</div>

Progress is the integral of speed, so now I could find *f(t)*:

<div class="math-block">
<math display="block" aria-label="Deriving the progress function by integrating its speed">
  <mstyle displaystyle="true">
    <mtable columnalign="left" rowspacing="0.8em">
      <mtr>
        <mtd>
          <mi>f</mi><mo>(</mo><mi>t</mi><mo>)</mo>
          <mo>=</mo>
          <mi>C</mi><mo>+</mo>
          <msubsup><mo>∫</mo><mn>0</mn><mi>t</mi></msubsup>
          <mi>k</mi><mi>u</mi><mo>(</mo><mn>1</mn><mo>−</mo><mi>u</mi><mo>)</mo><mspace width="0.2em"/><mi>d</mi><mi>u</mi>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mi>f</mi><mo>(</mo><mi>t</mi><mo>)</mo>
          <mo>=</mo>
          <mi>C</mi><mo>+</mo><mi>k</mi><mo>(</mo>
          <mfrac><msup><mi>t</mi><mn>2</mn></msup><mn>2</mn></mfrac>
          <mo>−</mo>
          <mfrac><msup><mi>t</mi><mn>3</mn></msup><mn>3</mn></mfrac>
          <mo>)</mo>
        </mtd>
      </mtr>
    </mtable>
  </mstyle>
</math>
</div>

Now I used the first condition, *f(0) = 0*, to find the integration constant:

<div class="math-block">
<math display="block" aria-label="Using f of zero equals zero gives C equals zero">
  <mstyle displaystyle="true">
    <mtable columnalign="left" rowspacing="0.7em">
      <mtr>
        <mtd>
          <mi>f</mi><mo>(</mo><mn>0</mn><mo>)</mo>
          <mo>=</mo>
          <mi>k</mi><mo>(</mo><mfrac><msup><mn>0</mn><mn>2</mn></msup><mn>2</mn></mfrac><mo>−</mo><mfrac><msup><mn>0</mn><mn>3</mn></msup><mn>3</mn></mfrac><mo>)</mo>
          <mo>+</mo><mi>C</mi>
          <mo>=</mo><mn>0</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd><mi>C</mi><mo>=</mo><mn>0</mn></mtd>
      </mtr>
    </mtable>
  </mstyle>
</math>
</div>

Then I used *f(1) = 1* to find `k`:

<div class="math-block">
<math display="block" aria-label="Using f of one equals one gives k equals six">
  <mstyle displaystyle="true">
    <mtable columnalign="left" rowspacing="0.7em">
      <mtr>
        <mtd>
          <mi>k</mi><mo>(</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mo>−</mo><mfrac><mn>1</mn><mn>3</mn></mfrac><mo>)</mo>
          <mo>=</mo><mn>1</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd><mfrac><mi>k</mi><mn>6</mn></mfrac><mo>=</mo><mn>1</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mi>k</mi><mo>=</mo><mn>6</mn></mtd>
      </mtr>
    </mtable>
  </mstyle>
</math>
</div>

Putting `k = 6` and `C = 0` back into the function finally gave me:

<div class="math-block math-block-result">
<math display="block" aria-label="f of t equals three t squared minus two t cubed, which equals t squared times three minus two t">
  <mi>f</mi><mo>(</mo><mi>t</mi><mo>)</mo>
  <mo>=</mo>
  <mn>3</mn><msup><mi>t</mi><mn>2</mn></msup>
  <mo>−</mo>
  <mn>2</mn><msup><mi>t</mi><mn>3</mn></msup>
  <mo>=</mo>
  <msup><mi>t</mi><mn>2</mn></msup><mo>(</mo><mn>3</mn><mo>−</mo><mn>2</mn><mi>t</mi><mo>)</mo>
</math>
</div>

## A Whole Page of Math Became One Line

And that entire page in my notebook became this one line in the website:

```js
const smoothTime = elapsed * elapsed * (3 - 2 * elapsed);
```

Apparently this is a well-known easing function called `smoothstep`. But deriving it myself instead of just copying it made something click.

Math used to be fun. Somewhere between exams, memorising formulas and solving the same type of questions again and again, I think I forgot that. Here every condition had an actual meaning I could see on the screen. The math was not a separate thing anymore. It was making the loading bar move exactly how I wanted.
