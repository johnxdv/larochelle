"use client";

import { useId, useState, type FormEvent } from "react";

const SUJETS = [
  "Vendre un bien",
  "Estimer un bien",
  "Acheter",
  "Louer",
  "Autre demande",
] as const;

type Props = {
  /** Sujet présélectionné dans la liste déroulante */
  sujetInitial?: string;
  /** Message pré-rédigé, par exemple une demande de visite */
  messageInitial?: string;
  /** Version resserrée, sans liste de sujets, pour les fiches de biens */
  compact?: boolean;
  /** Libellé du bouton d'envoi */
  libelleEnvoi?: string;
};

const CHAMP =
  "w-full rounded-2xl border border-[var(--filet)] bg-white/65 px-4 py-3.5 text-[0.9375rem] text-encre placeholder:text-encre-3/70 transition-all duration-300 outline-none focus:border-azur/50 focus:bg-white focus:ring-4 focus:ring-azur/12";

const LABEL = "block text-[0.8125rem] font-medium text-encre-2";

export function FormulaireContact({
  sujetInitial = SUJETS[0],
  messageInitial = "",
  compact = false,
  libelleEnvoi = "Envoyer ma demande",
}: Props) {
  const id = useId();
  const [envoye, setEnvoye] = useState(false);
  const [prenom, setPrenom] = useState("");

  // Démonstration : aucun envoi réel, seulement la confirmation à l'écran.
  const soumettre = (evenement: FormEvent<HTMLFormElement>) => {
    evenement.preventDefault();
    const donnees = new FormData(evenement.currentTarget);
    setPrenom(String(donnees.get("nom") ?? "").split(" ")[0] ?? "");
    setEnvoye(true);
  };

  if (envoye) {
    return (
      <div className="verre rounded-[2rem] px-6 py-12 text-center sm:px-10 sm:py-16">
        <span
          aria-hidden="true"
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-atlantique text-calcaire"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
            <path
              d="m5 12.5 4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="titre mt-6 text-[1.9rem] text-atlantique">
          {prenom ? `Merci ${prenom}.` : "Merci."}
        </h3>
        <p className="plume mx-auto mt-3 max-w-[40ch]">
          Votre demande nous est bien parvenue. Un conseiller vous répond sous
          vingt-quatre heures ouvrées, par téléphone ou par courriel, selon ce
          que vous préférez.
        </p>
        <p className="mt-6 text-xs text-encre-3">
          Site de démonstration : ce formulaire n’envoie réellement aucun message.
        </p>
        <button
          type="button"
          onClick={() => setEnvoye(false)}
          className="btn btn-contour mt-7"
        >
          Écrire un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={soumettre} className="verre rounded-[2rem] p-6 sm:p-9" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className={LABEL} htmlFor={`${id}-nom`}>
            Nom et prénom
          </label>
          <input
            id={`${id}-nom`}
            name="nom"
            type="text"
            required
            autoComplete="name"
            placeholder="Camille Durand"
            className={`${CHAMP} mt-2`}
          />
        </div>

        <div className="sm:col-span-1">
          <label className={LABEL} htmlFor={`${id}-email`}>
            Adresse électronique
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="camille@exemple.fr"
            className={`${CHAMP} mt-2`}
          />
        </div>

        <div className="sm:col-span-1">
          <label className={LABEL} htmlFor={`${id}-tel`}>
            Téléphone <span className="text-encre-3">(facultatif)</span>
          </label>
          <input
            id={`${id}-tel`}
            name="telephone"
            type="tel"
            autoComplete="tel"
            placeholder="06 00 00 00 00"
            className={`${CHAMP} mt-2`}
          />
        </div>

        {compact ? null : (
          <div className="sm:col-span-1">
            <label className={LABEL} htmlFor={`${id}-sujet`}>
              Votre demande
            </label>
            <select
              id={`${id}-sujet`}
              name="sujet"
              defaultValue={sujetInitial}
              className={`${CHAMP} mt-2 appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%233b525f' stroke-width='1.5' stroke-linecap='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")",
              }}
            >
              {SUJETS.map((sujet) => (
                <option key={sujet} value={sujet}>
                  {sujet}
                </option>
              ))}
            </select>
          </div>
        )}

        {compact ? (
          <div className="sm:col-span-1">
            <label className={LABEL} htmlFor={`${id}-creneau`}>
              Créneau de visite souhaité
            </label>
            <input
              id={`${id}-creneau`}
              name="creneau"
              type="text"
              placeholder="En semaine, en fin de journée"
              className={`${CHAMP} mt-2`}
            />
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor={`${id}-message`}>
            Votre message
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={compact ? 4 : 6}
            required
            defaultValue={messageInitial}
            placeholder="Dites-nous en quelques mots ce que vous cherchez, ou ce que vous souhaitez vendre."
            className={`${CHAMP} mt-2 resize-y`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[0.8125rem] text-encre-2">
            <input
              type="checkbox"
              name="consentement"
              required
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md border border-[var(--filet)] accent-[var(--color-atlantique)]"
            />
            <span>
              J’accepte que mes informations soient utilisées pour répondre à ma
              demande. Elles ne seront ni cédées ni utilisées à d’autres fins.
            </span>
          </label>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primaire verre-reflet w-full sm:w-auto">
          {libelleEnvoi}
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="text-xs text-encre-3">Réponse sous 24 h ouvrées.</p>
      </div>
    </form>
  );
}
