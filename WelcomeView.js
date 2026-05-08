import { navigate } from "./app.js";
import { supabase } from "./supabase.js";

export function WelcomeView(app) {

  app.innerHTML = `
    <div class="welcome-screen">

      <div class="welcome-box">

        <h1 class="welcome-title">Tú eres</h1>

        <div class="welcome-grid two">
          <button class="select-btn gender-btn" data-value="H">
            Hombre
          </button>

          <button class="select-btn gender-btn" data-value="M">
            Mujer
          </button>
        </div>

        <h2 class="welcome-subtitle">
          Buscas conocer a...
        </h2>

        <div class="welcome-grid two">

          <button class="select-btn target-btn" data-value="H">
            Hombres
          </button>

          <button class="select-btn target-btn" data-value="M">
            Mujeres
          </button>

        </div>

        <div class="welcome-grid one">
          <button class="select-btn target-btn both-btn" data-value="X">
            Ambos
          </button>
        </div>

      </div>

      <div class="welcome-bottom">
        <button id="continueBtn" class="continue-btn disabled">
          Continuar
        </button>
      </div>

    </div>
  `;

  let sexo = null;
  let orientacion = null;

  const continueBtn = document.getElementById("continueBtn");

  const genderBtns = document.querySelectorAll(".gender-btn");
  const targetBtns = document.querySelectorAll(".target-btn");

  /* ===================== */
  /* SEXO (solo uno)       */
  /* ===================== */

  genderBtns.forEach(btn => {

    btn.addEventListener("click", () => {

      genderBtns.forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      sexo = btn.dataset.value; // H o M

      validate();
    });

  });

  /* ===================== */
  /* ORIENTACION           */
  /* ===================== */

  targetBtns.forEach(btn => {

    btn.addEventListener("click", () => {

      targetBtns.forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      orientacion = btn.dataset.value; // H, M o X

      validate();
    });

  });

  /* ===================== */
  /* VALIDAR               */
  /* ===================== */

  function validate() {

    if (sexo && orientacion) {
      continueBtn.classList.remove("disabled");
      continueBtn.disabled = false;
    } else {
      continueBtn.classList.add("disabled");
      continueBtn.disabled = true;
    }

  }

  continueBtn.disabled = true;

  /* ===================== */
  /* CONTINUAR             */
  /* ===================== */

  continueBtn.addEventListener("click", async () => {

    if (!sexo || !orientacion) return;

    try {

      const userId = crypto.randomUUID();

      localStorage.setItem("user_id", userId);
      localStorage.setItem("sexo", sexo);
      localStorage.setItem("orientacion", orientacion);

      const { error } = await supabase
        .from("posts")
        .upsert(
          {
            user_id: userId,
            Sexo: sexo,                 // H o M
            Orientacion: orientacion   // H / M / X
          },
          {
            onConflict: "user_id"
          }
        );

      if (error) {
        alert("Error guardando datos");
        return;
      }

      navigate("feed");

    } catch (err) {

      alert("Error inesperado");

    }

  });

}
