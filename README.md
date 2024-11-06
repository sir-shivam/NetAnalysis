# Network Analysis Assignment (Coding Project)


# Input Guide for Network Analysis


To perform network analysis, users need to input polynomial functions. There are **three types of input formats** for the numerator and denominator polynomials:

## 1. Default Input Format: `k(s + a)(s + b)(s + c)...`
   - This format applies to **RC and RL networks**.
   - Use this format for both the **numerator** and **denominator**, where coefficients are given in the form `k(s + a)(s + b)...`.

   **Examples**:
   
   1. **Input**: `(s + 2)(s + 4)...`  
      **Format**: `1, 2, 4...`
      **Note:** Here, `1` default value for k.
   
   2. **Input**: `3(s + 3)(s + 2)(s + 4)...`  
      **Format**: `3, 3, 2, 4...`
   
   3. **Input**: `s(s + 2)(s + 4)...`  
      **Format**: `1, 0, 2, 4...`  
      **Note:** Here, `0` represents a root at 0 (zero).
      


---

## 2. Polynomial Input Format: `as^3 + bs^2 + cs + d`
   - This format supports **RC, RL, and LC networks**.
   - Use this format for any polynomial where coefficients are provided explicitly.

   **Examples**:
   
   1. `1s^2 + 3s + 3`
   
   2. `5s^3 + 2s^2 + s + 12`

   **LC Networks Only:** If the polynomial has **only even** or **only odd powers** (e.g., `5s^6 + 2s^4 + s^2 + 12`), it represents an LC network.

   

---

## 3. LC-Specific Input Format: `(s^2 + a)(s^2 + b)(s^2 + c)...`
   - This format applies **only to LC networks**.
   - Use this format to provide inputs where terms are squared, i.e., `(s^2 + a)(s^2 + b)...`.

   **Examples**:
   
   1. **Input**: `(s^2 + 2)(s^2 + 4)...`  
      **Format**: `1, 2, 4...`
      **Note:** Here, `1` default value for k.

   
   2. **Input**: `3(s^2 + 3)(s^2 + 2)(s^2 + 4)...`  
      **Format**: `3, 3, 2, 4...`
   
   3. **Input**: `s(s^2 + 2)(s^2 + 4)...`  
      **Format**: `1, 0, 2, 4...`  
      **Note:** Here, `0` represents a root at 0 (zero).

   

---

With these examples, users should have a clear guide for inputting each type.
