const { useState, useEffect, useCallback } = React;

const WARMUPS = [
  {
    label: "Mon",
    exercises: [
      { name: "Arm circles", duration: "30 s each direction", cue: "Big slow circles, gradually increase range. Loosens shoulder capsule." },
      { name: "Band / no-band chest opener", duration: "30 s", cue: "Arms wide, squeeze shoulder blades together. Opens the chest and front delts." },
      { name: "Wall shoulder slides (YTWL)", duration: "45 s", cue: "Back flat on wall, slide arms up and down. Activates rotator cuff before pressing." },
      { name: "Push-up to downward dog", duration: "45 s", cue: "Flow between a push-up and a pike stretch. Wakes up chest, triceps, and shoulders together." },
      { name: "Wrist circles + wrist flexor stretch", duration: "30 s", cue: "Essential before any pressing. Rotate slowly both ways, then hold a gentle stretch." },
    ]
  },
  {
    label: "Tue",
    exercises: [
      { name: "Hip circles", duration: "30 s each direction", cue: "Hands on hips, big slow circles. Lubricates the hip joint before squatting." },
      { name: "Bodyweight squat to pause", duration: "45 s", cue: "Squat slowly, pause 2s at the bottom. Warms up quads, glutes, and ankles." },
      { name: "Leg swings (front-back)", duration: "20 reps each leg", cue: "Hold a wall, swing straight leg. Mobilises the hip flexor and hamstring." },
      { name: "Lateral leg swings", duration: "20 reps each leg", cue: "Swing leg side to side across your body. Opens up the inner thigh and hip abductors." },
      { name: "Ankle circles + calf raise", duration: "30 s", cue: "Rotate ankles slowly, then 10 slow calf raises. Prepares ankles for loaded squats." },
    ]
  },
  {
    label: "Wed",
    exercises: [
      { name: "Cat-cow", duration: "45 s", cue: "On all fours, arch and round your spine slowly. Mobilises the thoracic spine — key for rows." },
      { name: "Band pull-apart (or arms-wide squeeze)", duration: "30 s", cue: "Arms extended, pull hands apart squeezing rear delts. Direct warm-up for the muscles you'll train." },
      { name: "Scapular retractions", duration: "20 reps", cue: "Arms at sides, squeeze and release shoulder blades. Activates the mid-back before pulling." },
      { name: "Doorframe / rack bicep stretch", duration: "30 s each arm", cue: "Extend arm back on a rack, gentle stretch. Preps the bicep tendon for heavy pulling." },
      { name: "Resistance band lat stretch (or overhead side stretch)", duration: "30 s each side", cue: "Reach one arm overhead and lean. Stretches the lat through full ROM before pulldowns." },
    ]
  },
  {
    label: "Thu",
    exercises: [
      { name: "Glute bridge hold", duration: "3 × 10 s hold", cue: "Feet flat, drive hips up and squeeze hard at the top. Fires up glutes before heavier work." },
      { name: "Hip flexor lunge stretch", duration: "30 s each side", cue: "Low lunge, back knee down. Opens the hip flexor — crucial for hip thrust range." },
      { name: "Leg swings (front-back)", duration: "20 reps each leg", cue: "Big pendulum swings. Warms hamstrings and primes the hip hinge pattern." },
      { name: "Romanian deadlift with no weight (hip hinge drill)", duration: "10 reps", cue: "Hands on thighs, hinge back feeling the hamstring stretch. Practise the pattern before loading it." },
      { name: "Clamshells or lateral band walk", duration: "20 reps each side", cue: "Activates the glute medius — the muscle that stabilises your hips throughout the whole session." },
    ]
  },
  {
    label: "Fri",
    exercises: [
      { name: "Jumping jacks", duration: "45 s", cue: "Elevates heart rate immediately. This is your cardio day — start warm." },
      { name: "Bodyweight squat to press", duration: "30 s", cue: "Squat, then drive arms overhead as you stand. Mimics the thruster pattern you'll do loaded." },
      { name: "Inchworm", duration: "6 reps", cue: "Walk hands out to a plank and back. Mobilises the whole posterior chain and shoulders." },
      { name: "Hip circles + torso rotation", duration: "30 s", cue: "Rotate hips and then torso in big circles. Preps the core for the woodchop and rotational work." },
      { name: "High knees or skipping in place", duration: "30 s", cue: "Keep it brisk. You want to feel slightly warm before the first set — that's the goal." },
    ]
  },
];

const DAYS = [
  {
    label: "Mon",
    title: "Upper body — push",
    tip: "Keep shoulder blades retracted throughout. Rest 60s on compounds, 45s on isolation.",
    A: {
      floors: [
        {
          name: "Free weights floor",
          exercises: [
            { name: "Dumbbell bench press", sets: "4 × 12", rest: "60 s", muscles: "Chest, front delts, triceps", eq: "DB + bench", guide: ["Lie flat, DBs at chest height, elbows at ~45°.", "Press up until arms extended but not locked out.", "Lower slowly over 2s. Keep wrists stacked over elbows."] },
            { name: "Dumbbell incline press", sets: "3 × 12", rest: "60 s", muscles: "Upper chest, front delts, triceps", eq: "DB + bench", guide: ["Bench at 30–40°. Same grip as flat press.", "Incline shifts emphasis to upper chest — don't go too steep.", "Control the descent. Pause briefly at the bottom."] },
            { name: "Dumbbell lateral raise", sets: "3 × 15", rest: "45 s", muscles: "Side delts", eq: "DB", guide: ["Slight forward lean, soft knees.", "Raise arms to shoulder height, leading with elbows.", "Lower slowly. Go lighter than you think."] },
            { name: "Dumbbell overhead press", sets: "3 × 12", rest: "60 s", muscles: "Shoulders, triceps, upper traps", eq: "DB", guide: ["Seated or standing. DBs at shoulder height.", "Press up, bringing DBs slightly together at top.", "Core braced — don't arch lower back."] },
            { name: "Overhead tricep extension", sets: "3 × 15", rest: "45 s", muscles: "Triceps (long head)", eq: "DB", guide: ["Hold one DB with both hands overhead.", "Bend at elbows only, lower behind head.", "Keep elbows pointing forward — don't let them flare."] },
          ]
        }
      ]
    },
    B: {
      floors: [
        {
          name: "Free weights floor",
          exercises: [
            { name: "Dumbbell chest fly", sets: "4 × 12", rest: "60 s", muscles: "Chest (stretch-focused), front delts", eq: "DB + bench", guide: ["Flat bench, slight bend in elbows — maintain throughout.", "Open arms wide until you feel the chest stretch.", "Squeeze to bring DBs back together at the top."] },
            { name: "Dumbbell Arnold press", sets: "3 × 12", rest: "60 s", muscles: "Shoulders (all heads), triceps", eq: "DB", guide: ["Start with DBs at chin, palms facing you.", "Rotate palms outward as you press up.", "Reverse rotation on the way down. Go slowly."] },
            { name: "Dumbbell front raise", sets: "3 × 12", rest: "45 s", muscles: "Front delts", eq: "DB", guide: ["Alternate arms, raising to shoulder height.", "Slight elbow bend. Don't swing.", "Lower slowly — the eccentric phase matters."] },
            { name: "Dumbbell lateral raise", sets: "3 × 15", rest: "45 s", muscles: "Side delts", eq: "DB", guide: ["Same as Week A.", "On your final set, do a drop set — go to failure, drop the weight, continue."] },
            { name: "Dumbbell skull crusher", sets: "3 × 12", rest: "45 s", muscles: "Triceps", eq: "DB + bench", guide: ["Flat bench, DBs above head, palms facing each other.", "Hinge only at elbows, lower toward temples.", "Keep upper arms vertical throughout."] },
          ]
        }
      ]
    }
  },
  {
    label: "Tue",
    title: "Lower body — quad focus",
    tip: "Start with your barbell compound (free weights floor), then move to machines and stay there. 90s rest after squats.",
    A: {
      floors: [
        {
          name: "Free weights floor",
          exercises: [
            { name: "Barbell back squat", sets: "4 × 10", rest: "90 s", muscles: "Quads, glutes, hamstrings, core", eq: "Squat rack", guide: ["Bar on upper traps, feet shoulder-width, toes slightly out.", "Brace core, squat until thighs parallel to floor.", "Drive through heels to stand. Chest up, knees track over toes."] },
            { name: "Dumbbell walking lunge", sets: "3 × 12/leg", rest: "60 s", muscles: "Quads, glutes, hamstrings", eq: "DB", guide: ["DBs at sides. Step forward, back knee toward (not on) floor.", "Front shin vertical. Drive off front heel.", "Keep torso upright. Don't let front knee cave inward."] },
          ]
        },
        {
          name: "Machine floor",
          exercises: [
            { name: "Leg press", sets: "4 × 12", rest: "60 s", muscles: "Quads, glutes, hamstrings", eq: "Machine", guide: ["Feet shoulder-width, mid-plate. Lower until knees ~90°.", "Don't let lower back peel off the pad.", "Don't lock out knees at top. Keep tension throughout."] },
            { name: "Cable sumo squat", sets: "3 × 12", rest: "60 s", muscles: "Inner thighs, glutes, quads", eq: "Cable", guide: ["Low pulley, stand wide, toes out 45°. Hold handle with both hands.", "Squat down, chest up, knees pushing out over toes.", "Drive through heels to stand."] },
            { name: "Adductor machine", sets: "3 × 15", rest: "45 s", muscles: "Inner thighs (adductors)", eq: "Machine", guide: ["Sit tall, back on pad, legs wide.", "Squeeze legs together slowly. Hold at the closed position.", "Open slowly — control both directions."] },
          ]
        }
      ]
    },
    B: {
      floors: [
        {
          name: "Free weights floor",
          exercises: [
            { name: "Barbell front squat", sets: "4 × 8", rest: "90 s", muscles: "Quads (emphasis), core, upper back", eq: "Squat rack", guide: ["Bar on front of shoulders. Stay very upright — essential for front squats.", "Squat deep, drive knees out.", "Go lighter than you think."] },
            { name: "Dumbbell step-up", sets: "3 × 12/leg", rest: "60 s", muscles: "Quads, glutes", eq: "DB + bench", guide: ["One foot fully on bench. Drive through that heel to step up.", "Stand tall at top. Lower trailing leg slowly — don't drop.", "Complete all reps one leg before switching."] },
          ]
        },
        {
          name: "Machine floor",
          exercises: [
            { name: "Leg press — narrow stance", sets: "4 × 12", rest: "60 s", muscles: "Outer quads, glutes", eq: "Machine", guide: ["Feet closer together, still mid-plate.", "Narrower stance shifts emphasis to outer quad sweep.", "Same rules as regular leg press."] },
            { name: "Cable squat to row", sets: "3 × 12", rest: "60 s", muscles: "Quads, glutes, upper back, biceps", eq: "Cable", guide: ["Low pulley, face cable, hold handle with both hands.", "Squat down as cable counterbalances you.", "As you stand, row handle to chest, elbows driving back."] },
            { name: "Adductor machine", sets: "3 × 15", rest: "45 s", muscles: "Inner thighs (adductors)", eq: "Machine", guide: ["Same as Week A. Try increasing weight slightly if on second week."] },
          ]
        }
      ]
    }
  },
  {
    label: "Wed",
    title: "Upper body — pull",
    tip: "Drive through your elbows on every row. Full stretch at the bottom of each pull.",
    A: {
      floors: [
        {
          name: "Machine floor",
          exercises: [
            { name: "Lat pulldown (wide grip)", sets: "4 × 12", rest: "60 s", muscles: "Lats, biceps, rear delts", eq: "Cable machine", guide: ["Wide overhand grip. Pull bar to upper chest, lead with elbows.", "Lean back slightly.", "Let bar rise fully — lats stretch at the top."] },
            { name: "Seated low row", sets: "4 × 12", rest: "60 s", muscles: "Mid-back, lats, biceps", eq: "Cable machine", guide: ["Sit upright, neutral grip. Row to lower sternum, elbows hugging sides.", "Squeeze shoulder blades at end.", "Extend arms fully on return."] },
            { name: "Single-arm cable row", sets: "3 × 12/side", rest: "45 s", muscles: "Lats, mid-back, biceps", eq: "Cable", guide: ["Mid-height cable. Row elbow back past your hip.", "Let torso rotate slightly toward cable at bottom for greater ROM.", "Control the return fully."] },
            { name: "Cable face pull", sets: "3 × 15", rest: "45 s", muscles: "Rear delts, rotator cuff, upper traps", eq: "Cable", guide: ["High pulley, rope attachment. Pull to face, hands splitting at ear level.", "Elbows finish above shoulder height.", "Go light — this is a shoulder health exercise."] },
          ]
        },
        {
          name: "Free weights floor",
          exercises: [
            { name: "Dumbbell bent-over row", sets: "3 × 12", rest: "60 s", muscles: "Lats, mid-back, biceps", eq: "DB + bench", guide: ["One knee and hand on bench. Back flat and parallel to floor.", "Row DB from hanging to your hip, elbow driving back.", "Don't rotate torso to pull."] },
            { name: "Dumbbell bicep curl", sets: "3 × 15", rest: "45 s", muscles: "Biceps, forearms", eq: "DB", guide: ["Alternate arms. Supinate wrist as you curl (rotate palm upward).", "Full range — arm fully extended at start.", "Lower slowly. No swinging."] },
          ]
        }
      ]
    },
    B: {
      floors: [
        {
          name: "Machine floor",
          exercises: [
            { name: "Lat pulldown (close grip)", sets: "4 × 12", rest: "60 s", muscles: "Lats (inner), biceps", eq: "Cable machine", guide: ["Neutral/close grip handle. Pull to chin level.", "Close grip hits inner/lower lat differently to wide grip.", "Same rules: lead with elbows, full stretch at top."] },
            { name: "Seated low row — wide grip", sets: "4 × 12", rest: "60 s", muscles: "Upper back, rear delts, traps", eq: "Cable machine", guide: ["Wide bar attachment. Row to lower chest. Elbows flare slightly.", "Shifts work to upper back.", "Squeeze hard at finish. Pause before releasing."] },
            { name: "Cable straight-arm pulldown", sets: "3 × 15", rest: "45 s", muscles: "Lats", eq: "Cable", guide: ["High pulley, straight bar. Stand back, arms extended above.", "Pull bar down in an arc keeping arms straight to thighs.", "Return slowly — the stretch is where lats grow."] },
            { name: "Cable rear delt fly", sets: "3 × 15", rest: "45 s", muscles: "Rear delts, upper back", eq: "Cable", guide: ["Two high cables, cross arms and grab opposite handle.", "Pull outward and slightly down in a reverse fly motion.", "Slight elbow bend. Squeeze rear delts at end."] },
          ]
        },
        {
          name: "Free weights floor",
          exercises: [
            { name: "Dumbbell chest-supported row", sets: "3 × 12", rest: "60 s", muscles: "Mid-back, lats, rear delts", eq: "DB + bench", guide: ["Bench at 30–45°. Lie chest-down, DBs hanging below.", "Row both DBs simultaneously to hips, elbows driving back.", "Chest support eliminates momentum — pure back work."] },
            { name: "Dumbbell hammer curl", sets: "3 × 15", rest: "45 s", muscles: "Biceps, brachialis, forearms", eq: "DB", guide: ["Neutral grip (palms facing each other) throughout.", "Curl both arms or alternate. Lower all the way down each rep.", "Full extension matters."] },
          ]
        }
      ]
    }
  },
  {
    label: "Thu",
    title: "Lower body — glute & hamstring focus",
    tip: "Hip hinge is key today. Think: push hips back, not bend knees. Pause and squeeze hard at top of every hip thrust.",
    A: {
      floors: [
        {
          name: "Free weights floor",
          exercises: [
            { name: "Barbell Romanian deadlift", sets: "4 × 10", rest: "90 s", muscles: "Hamstrings, glutes, lower back", eq: "Squat rack", guide: ["Bar at hip height. Hinge at hips, pushing them back as bar slides down legs.", "Soft bend in knees. Feel the hamstring stretch.", "Drive hips forward to return. Squeeze glutes hard at top."] },
            { name: "Dumbbell sumo squat", sets: "3 × 12", rest: "60 s", muscles: "Inner thighs, glutes, quads", eq: "DB", guide: ["Hold one DB vertically with both hands. Wide stance, toes out 45°.", "Squat straight down, chest up, knees pushing out.", "Drive through heels. Squeeze glutes at top."] },
            { name: "Dumbbell hip thrust", sets: "4 × 12", rest: "60 s", muscles: "Glutes (primary), hamstrings", eq: "DB + bench", guide: ["Upper back on bench edge. DB on hips — hold in place.", "Feet flat, hip-width. Lower hips, then drive up explosively.", "Full hip extension at top. Squeeze for 1 second. Don't hyperextend lower back."] },
          ]
        },
        {
          name: "Machine floor",
          exercises: [
            { name: "Cable pull-through", sets: "3 × 15", rest: "45 s", muscles: "Glutes, hamstrings", eq: "Cable", guide: ["Low pulley, rope attachment. Stand facing away, rope between legs.", "Hinge forward at hips, letting rope pull back through legs.", "Drive hips forward to stand — hip hinge, not a squat. Squeeze glutes at top."] },
            { name: "Abductor machine", sets: "3 × 15", rest: "45 s", muscles: "Outer glutes, hip abductors", eq: "Machine", guide: ["Sit tall. Push legs outward as wide as comfortable.", "Return slowly — the controlled closing is where the muscle works.", "Don't let it slam shut."] },
          ]
        }
      ]
    },
    B: {
      floors: [
        {
          name: "Free weights floor",
          exercises: [
            { name: "Barbell hip thrust", sets: "4 × 12", rest: "90 s", muscles: "Glutes (primary), hamstrings", eq: "Squat rack + bench", guide: ["Upper back on bench. Bar in crease of hips — use a pad for comfort.", "Feet flat, hip-width. Lower hips, drive up powerfully.", "Full hip extension at top. Chin tucked slightly."] },
            { name: "Bulgarian split squat", sets: "3 × 10/leg", rest: "75 s", muscles: "Glutes, quads, hamstrings", eq: "DB + bench", guide: ["Rear foot elevated on bench, laces down. Hold DBs at sides.", "Lower back knee toward floor. Lean forward slightly at hips.", "Drive through front heel to stand. This will burn — that's good."] },
            { name: "Dumbbell Romanian deadlift", sets: "3 × 12", rest: "60 s", muscles: "Hamstrings, glutes", eq: "DB", guide: ["Single-leg variation: hold one DB, hinge on one leg while the other floats behind.", "Keep hips square. Feel the hamstring of the standing leg stretch deeply.", "Return to standing slowly. Use rack for balance if needed."] },
          ]
        },
        {
          name: "Machine floor",
          exercises: [
            { name: "Cable kickback", sets: "3 × 15/leg", rest: "45 s", muscles: "Glutes", eq: "Cable", guide: ["Ankle attachment, low pulley. Hinge slightly forward, hold machine for support.", "Kick attached leg straight back, squeezing glute hard at top.", "Don't swing — small and controlled. Isolation, not momentum."] },
            { name: "Abductor machine", sets: "3 × 15", rest: "45 s", muscles: "Outer glutes, hip abductors", eq: "Machine", guide: ["Same as Week A. Try pausing 2 seconds at the widest point to increase time under tension."] },
          ]
        }
      ]
    }
  },
  {
    label: "Fri",
    title: "Full body — metabolic",
    tip: "Keep rest to 30–45s today. You should feel slightly breathless between sets. This is your cardio.",
    A: {
      floors: [
        {
          name: "Free weights floor",
          exercises: [
            { name: "Dumbbell thrusters", sets: "4 × 15", rest: "45 s", muscles: "Quads, glutes, shoulders, triceps", eq: "DB", guide: ["Hold DBs at shoulder height. Squat down (full depth).", "As you stand, press DBs overhead in one fluid motion. Power from the legs.", "Lower DBs back to shoulders as you descend into next squat."] },
            { name: "Dumbbell renegade row", sets: "3 × 10/side", rest: "45 s", muscles: "Back, biceps, core (anti-rotation)", eq: "DB", guide: ["Plank position, one hand on each DB. Feet wide for stability.", "Row one DB to your hip while the other arm stays planted.", "Don't rotate your hips — staying still is the core challenge."] },
            { name: "Dumbbell reverse lunge to curl", sets: "3 × 10/leg", rest: "45 s", muscles: "Quads, glutes, hamstrings, biceps", eq: "DB", guide: ["Hold DBs at sides. Step back into reverse lunge, back knee toward floor.", "As you drive back to standing, curl both DBs simultaneously.", "Complete all reps one side before switching."] },
          ]
        },
        {
          name: "Machine floor",
          exercises: [
            { name: "Cable woodchop (high to low)", sets: "3 × 12/side", rest: "30 s", muscles: "Obliques, core, shoulders", eq: "Cable", guide: ["High pulley, single handle, stand side-on.", "Pull handle diagonally across body from high to low, rotating through torso.", "Arms relatively straight — rotation comes from core, not arms."] },
            { name: "Cable woodchop (low to high)", sets: "3 × 12/side", rest: "30 s", muscles: "Obliques, core, shoulders", eq: "Cable", guide: ["Low pulley, same side-on stance.", "Pull diagonally from low to high (opposite shoulder).", "Same rule: rotate through the core."] },
            { name: "Leg press — high rep burnout", sets: "3 × 20", rest: "45 s", muscles: "Quads, glutes, hamstrings", eq: "Machine", guide: ["About 60% of your normal leg press weight.", "Pump out 20 reps with controlled form. No locking out.", "Embrace the burn."] },
          ]
        }
      ]
    },
    B: {
      floors: [
        {
          name: "Free weights floor",
          exercises: [
            { name: "Dumbbell clean and press", sets: "4 × 10", rest: "45 s", muscles: "Full body — power movement", eq: "DB", guide: ["Hold DBs at thighs. Explosively pull to shoulder height, then press overhead.", "Two phases: the clean (to shoulders) and the press (overhead).", "Lower with control — keep form clean as you fatigue."] },
            { name: "Dumbbell snatch", sets: "3 × 8/side", rest: "45 s", muscles: "Full body — glutes, hamstrings, shoulders", eq: "DB", guide: ["Hold one DB between feet in a squat position. Explode up, pulling DB overhead in one motion.", "Think: jump, shrug, punch up. DB should feel weightless at top.", "Lower carefully. Start light — this is a skill."] },
            { name: "Dumbbell step-up to press", sets: "3 × 10/leg", rest: "45 s", muscles: "Quads, glutes, shoulders", eq: "DB + bench", guide: ["One foot on bench. Drive up through that heel.", "At the top, press both DBs overhead.", "Lower DBs as you step back down. Finish the press before stepping down."] },
          ]
        },
        {
          name: "Machine floor",
          exercises: [
            { name: "Cable pallof press", sets: "3 × 12/side", rest: "30 s", muscles: "Core (anti-rotation), obliques", eq: "Cable", guide: ["Mid-height cable, single handle. Stand side-on, feet shoulder-width.", "Press handle straight out — cable tries to pull you toward it. Resist that.", "Hold for a beat fully extended, return to chest. Zero torso rotation."] },
            { name: "Lat pulldown — light, fast", sets: "3 × 20", rest: "20 s", muscles: "Lats, biceps", eq: "Cable machine", guide: ["About 50% of your normal weight. Pull fast but controlled.", "20 reps, then rest only 20 seconds.", "This is a metabolic finisher — embrace the burn."] },
            { name: "Leg press — light, fast", sets: "3 × 20", rest: "45 s", muscles: "Quads, glutes", eq: "Machine", guide: ["Light weight, 20 reps, explosive push, slow lower.", "Try a slightly different foot position than Week A."] },
          ]
        }
      ]
    }
  }
];

const STORAGE_KEY = "gym_log_v2";

function parseSetCount(s) {
  const m = s.match(/^(\d+)/);
  return m ? parseInt(m[1]) : 3;
}
function logKey(week, dayIdx, fi, ei) { return `${week}_${dayIdx}_${fi}_${ei}`; }
function emptySetRows(n) { return Array.from({ length: n }, () => ({ weight: "", reps: "" })); }

function loadLog() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; }
}
function saveLog(log) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(log)); } catch {}
}

function GymTracker() {
  const [week, setWeek] = useState("A");
  const [dayIdx, setDayIdx] = useState(0);
  const [warmupOpen, setWarmupOpen] = useState(false);
  const [openGuides, setOpenGuides] = useState({});
  const [openLog, setOpenLog] = useState({});
  const [log, setLog] = useState(loadLog);
  const [draft, setDraft] = useState({});
  const [editSession, setEditSession] = useState({});

  useEffect(() => { saveLog(log); }, [log]);

  const day = DAYS[dayIdx];
  const plan = day[week];
  const warmup = WARMUPS[dayIdx];

  const toggleGuide = k => setOpenGuides(p => ({ ...p, [k]: !p[k] }));
  const toggleLog = (k, ex) => {
    const opening = !openLog[k];
    setOpenLog(p => ({ ...p, [k]: opening }));
    if (opening && !draft[k]) {
      const n = parseSetCount(ex.sets);
      setDraft(p => ({ ...p, [k]: { sets: emptySetRows(n), customCount: n } }));
    }
  };

  const updateDraftSet = (k, si, field, val) => {
    setDraft(p => {
      const d = p[k] || { sets: [], customCount: 0 };
      const sets = d.sets.map((s, i) => i === si ? { ...s, [field]: val } : s);
      return { ...p, [k]: { ...d, sets } };
    });
  };

  const changeSetCount = (k, delta, ex) => {
    setDraft(p => {
      const d = p[k] || { sets: emptySetRows(parseSetCount(ex.sets)), customCount: parseSetCount(ex.sets) };
      const n = Math.max(1, (d.customCount || d.sets.length) + delta);
      let sets = [...d.sets];
      if (n > sets.length) while (sets.length < n) sets.push({ weight: "", reps: "" });
      else sets = sets.slice(0, n);
      return { ...p, [k]: { ...d, sets, customCount: n } };
    });
  };

  const submitEntry = k => {
    const d = draft[k];
    if (!d || !d.sets.some(s => s.weight || s.reps)) return;
    const entry = {
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      sets: d.sets.map(s => ({ weight: s.weight, reps: s.reps })),
    };
    setLog(prev => {
      const updated = [entry, ...(prev[k] || [])].slice(0, 5);
      return { ...prev, [k]: updated };
    });
    setDraft(p => ({ ...p, [k]: { ...d, sets: emptySetRows(d.customCount || d.sets.length) } }));
  };

  const startEditSession = (k, si, session) => {
    setEditSession(p => ({ ...p, [k]: si }));
    setDraft(p => ({ ...p, [k]: { sets: session.sets.map(s => ({ weight: s.weight || "", reps: s.reps || "" })), customCount: session.sets.length } }));
  };

  const saveEditSession = (k, si) => {
    const d = draft[k];
    if (!d) return;
    setLog(prev => {
      const arr = [...(prev[k] || [])];
      arr[si] = { ...arr[si], sets: d.sets.map(s => ({ weight: s.weight, reps: s.reps })) };
      return { ...prev, [k]: arr };
    });
    setEditSession(p => ({ ...p, [k]: null }));
    setDraft(p => ({ ...p, [k]: { sets: emptySetRows(d.customCount), customCount: d.customCount } }));
  };

  const cancelEdit = (k, ex) => {
    setEditSession(p => ({ ...p, [k]: null }));
    const n = parseSetCount(ex.sets);
    setDraft(p => ({ ...p, [k]: { sets: emptySetRows(n), customCount: n } }));
  };

  const C = {
    weekA: { bg: "#EEEDFE", text: "#534AB7", border: "#AFA9EC" },
    weekB: { bg: "#E1F5EE", text: "#0F6E56", border: "#5DCAA5" },
    floor: { bg: "#F1EFE8", text: "#5F5E5A" },
    rest: { bg: "#FAEEDA", text: "#854F0B" },
    muscle: { bg: "#EAF3DE", text: "#3B6D11" },
    eq: { bg: "#E6F1FB", text: "#185FA5" },
  };
  const wc = week === "A" ? C.weekA : C.weekB;

  return React.createElement("div", { style: { padding: "1rem 0" } },
    // Week + Day selectors
    React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, alignItems: "center" } },
      React.createElement("div", { style: { display: "flex", border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden" } },
        ["A", "B"].map(w =>
          React.createElement("button", {
            key: w, onClick: () => setWeek(w),
            style: { padding: "6px 20px", fontSize: 14, border: "none", cursor: "pointer", background: week === w ? (w === "A" ? C.weekA.bg : C.weekB.bg) : "transparent", color: week === w ? (w === "A" ? C.weekA.text : C.weekB.text) : "#888", fontWeight: week === w ? 600 : 400 }
          }, "Week " + w)
        )
      ),
      React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
        DAYS.map((d, i) =>
          React.createElement("button", {
            key: i, onClick: () => { setDayIdx(i); setWarmupOpen(false); },
            style: { padding: "5px 14px", fontSize: 13, border: `1px solid ${dayIdx === i ? "#bbb" : "#e0e0e0"}`, borderRadius: 8, cursor: "pointer", background: dayIdx === i ? "#f5f5f5" : "transparent", color: dayIdx === i ? "#111" : "#888", fontWeight: dayIdx === i ? 600 : 400 }
          }, d.label)
        )
      )
    ),

    React.createElement("div", { style: { background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden" } },
      // Title
      React.createElement("div", { style: { padding: "14px 18px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" } },
        React.createElement("span", { style: { fontSize: 16, fontWeight: 600, color: "#111" } }, day.title),
        React.createElement("span", { style: { fontSize: 13, color: "#888" } }, "~45 min · Week " + week)
      ),
      // Tip
      React.createElement("div", { style: { padding: "10px 18px", borderBottom: "1px solid #f0f0f0", fontSize: 13, color: C.rest.text, background: C.rest.bg } }, day.tip),

      // Warmup
      React.createElement("div", { style: { borderBottom: "1px solid #f0f0f0" } },
        React.createElement("button", {
          onClick: () => setWarmupOpen(p => !p),
          style: { width: "100%", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF8F0", border: "none", cursor: "pointer" }
        },
          React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "#A0522D" } }, "🔥 5-min Warmup"),
          React.createElement("span", { style: { fontSize: 12, color: "#A0522D" } }, warmupOpen ? "Hide ↑" : "Show ↓")
        ),
        warmupOpen && React.createElement("div", { style: { padding: "0 18px 12px" } },
          warmup.exercises.map((w, wi) =>
            React.createElement("div", { key: wi, style: { padding: "8px 0", borderBottom: wi < warmup.exercises.length - 1 ? "1px solid #f5f5f5" : "none" } },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 } },
                React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "#111" } }, w.name),
                React.createElement("span", { style: { fontSize: 11, color: "#A0522D", whiteSpace: "nowrap", background: "#FFF8F0", padding: "1px 7px", borderRadius: 5 } }, w.duration)
              ),
              React.createElement("div", { style: { fontSize: 12, color: "#777", marginTop: 3, lineHeight: 1.5 } }, w.cue)
            )
          )
        )
      ),

      // Floors + exercises
      plan.floors.map((floor, fi) =>
        React.createElement("div", { key: fi },
          React.createElement("div", { style: { padding: "8px 18px", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: C.floor.text, background: C.floor.bg, borderBottom: "1px solid #f0f0f0" } }, floor.name),
          floor.exercises.map((ex, ei) => {
            const k = logKey(week, dayIdx, fi, ei);
            const guideOpen = openGuides[k];
            const logOpen = openLog[k];
            const history = log[k] || [];
            const d = draft[k] || { sets: emptySetRows(parseSetCount(ex.sets)), customCount: parseSetCount(ex.sets) };
            const editIdx = editSession[k] ?? null;
            const isEditing = editIdx !== null;

            return React.createElement("div", { key: ei, style: { padding: "12px 18px", borderBottom: "1px solid #f5f5f5" } },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 } },
                React.createElement("div", { style: { flex: 1 } },
                  React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 6 } }, ex.name),
                  React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap" } },
                    React.createElement("span", { style: { fontSize: 11, padding: "2px 7px", borderRadius: 6, background: C.eq.bg, color: C.eq.text } }, ex.eq),
                    React.createElement("span", { style: { fontSize: 11, padding: "2px 7px", borderRadius: 6, background: C.rest.bg, color: C.rest.text } }, "Rest " + ex.rest),
                    React.createElement("span", { style: { fontSize: 11, padding: "2px 7px", borderRadius: 6, background: C.muscle.bg, color: C.muscle.text } }, ex.muscles)
                  )
                ),
                React.createElement("div", { style: { fontSize: 13, color: "#666", whiteSpace: "nowrap", fontWeight: 500 } }, ex.sets)
              ),
              React.createElement("div", { style: { display: "flex", gap: 12, marginTop: 10 } },
                React.createElement("button", { onClick: () => toggleGuide(k), style: { fontSize: 12, color: "#4a7fcb", background: "none", border: "none", cursor: "pointer", padding: 0 } }, guideOpen ? "Hide guide ↑" : "How to do it ↓"),
                React.createElement("button", { onClick: () => toggleLog(k, ex), style: { fontSize: 12, color: history.length > 0 ? C.weekB.text : "#aaa", background: "none", border: "none", cursor: "pointer", padding: 0 } }, logOpen ? "Hide log ↑" : `Log sets${history.length > 0 ? ` (${history.length})` : ""} ↓`)
              ),
              guideOpen && React.createElement("div", { style: { marginTop: 10, background: "#f9f9f9", borderRadius: 8, padding: "10px 12px" } },
                ex.guide.map((step, si) =>
                  React.createElement("div", { key: si, style: { display: "flex", gap: 8, marginBottom: si < ex.guide.length - 1 ? 6 : 0, fontSize: 12, color: "#555", lineHeight: 1.5 } },
                    React.createElement("span", { style: { fontWeight: 600, color: "#333", minWidth: 16 } }, (si + 1) + "."),
                    React.createElement("span", null, step)
                  )
                )
              ),
              logOpen && React.createElement("div", { style: { marginTop: 10 } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } },
                  React.createElement("span", { style: { fontSize: 12, color: "#666" } }, "Sets:"),
                  React.createElement("button", { onClick: () => changeSetCount(k, -1, ex), style: { width: 24, height: 24, border: "1px solid #ddd", borderRadius: 4, background: "#f5f5f5", cursor: "pointer", fontSize: 14 } }, "−"),
                  React.createElement("span", { style: { fontSize: 13, fontWeight: 600, minWidth: 16, textAlign: "center" } }, d.sets.length),
                  React.createElement("button", { onClick: () => changeSetCount(k, 1, ex), style: { width: 24, height: 24, border: "1px solid #ddd", borderRadius: 4, background: "#f5f5f5", cursor: "pointer", fontSize: 14 } }, "+")
                ),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 } },
                  React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("span", { style: { fontSize: 11, color: "#aaa", width: 38 } }),
                    React.createElement("span", { style: { fontSize: 11, color: "#aaa", width: 90 } }, "Weight (kg)"),
                    React.createElement("span", { style: { fontSize: 11, color: "#aaa", width: 64 } }, "Reps")
                  ),
                  d.sets.map((s, si) =>
                    React.createElement("div", { key: si, style: { display: "flex", gap: 8, alignItems: "center" } },
                      React.createElement("span", { style: { fontSize: 12, color: "#999", width: 38, flexShrink: 0 } }, "Set " + (si + 1)),
                      React.createElement("input", { type: "number", placeholder: "—", value: s.weight, onChange: e => updateDraftSet(k, si, "weight", e.target.value), style: { width: 90, fontSize: 13, padding: "4px 7px", border: "1px solid #ddd", borderRadius: 6, outline: "none" } }),
                      React.createElement("input", { type: "number", placeholder: "—", value: s.reps, onChange: e => updateDraftSet(k, si, "reps", e.target.value), style: { width: 64, fontSize: 13, padding: "4px 7px", border: "1px solid #ddd", borderRadius: 6, outline: "none" } })
                    )
                  )
                ),
                isEditing
                  ? React.createElement("div", { style: { display: "flex", gap: 8 } },
                      React.createElement("button", { onClick: () => saveEditSession(k, editIdx), style: { fontSize: 13, padding: "5px 14px", background: wc.bg, color: wc.text, border: `1px solid ${wc.border}`, borderRadius: 6, cursor: "pointer", fontWeight: 500 } }, "Update session"),
                      React.createElement("button", { onClick: () => cancelEdit(k, ex), style: { fontSize: 13, padding: "5px 14px", background: "#f5f5f5", color: "#666", border: "1px solid #ddd", borderRadius: 6, cursor: "pointer" } }, "Cancel")
                    )
                  : React.createElement("button", { onClick: () => submitEntry(k), style: { fontSize: 13, padding: "5px 14px", background: wc.bg, color: wc.text, border: `1px solid ${wc.border}`, borderRadius: 6, cursor: "pointer", fontWeight: 500 } }, "Save session"),
                history.length > 0 && React.createElement("div", { style: { marginTop: 12 } },
                  React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 6 } }, "Previous sessions"),
                  history.map((session, hi) =>
                    React.createElement("div", { key: hi, style: { marginBottom: 8, padding: "8px 10px", background: "#f9f9f9", borderRadius: 8, border: "1px solid #eee" } },
                      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 } },
                        React.createElement("span", { style: { fontSize: 12, fontWeight: 600, color: "#555" } }, session.date),
                        React.createElement("button", { onClick: () => startEditSession(k, hi, session), style: { fontSize: 11, color: "#4a7fcb", background: "none", border: "none", cursor: "pointer", padding: 0 } }, "Edit")
                      ),
                      session.sets.map((s, si) =>
                        React.createElement("div", { key: si, style: { display: "flex", gap: 10, fontSize: 12, color: "#666" } },
                          React.createElement("span", { style: { color: "#aaa", minWidth: 38 } }, "Set " + (si + 1)),
                          s.weight && React.createElement("span", null, s.weight + " kg"),
                          s.reps && React.createElement("span", null, s.reps + " reps"),
                          !s.weight && !s.reps && React.createElement("span", { style: { color: "#ccc" } }, "—")
                        )
                      )
                    )
                  )
                )
              )
            );
          })
        )
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(GymTracker));
