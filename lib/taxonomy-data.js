/**
 * EXAM_TAXONOMY.js
 * 
 * Hardcoded chapter and topic NAMES for SEO.
 * Google crawls this file directly — chapter/topic names are visible
 * in the JS bundle and used to populate sidebar, meta tags and page content.
 * 
 * Slugs are used as API filter keys (matched against DB chapters.slug / topics.slug).
 * Names are displayed in UI and indexed by search engines.
 * 
 * Stats: 328 chapters, 2755 topics
 * Source of truth: fresh_taxonomy_FINAL.sql
 */

export const EXAM_TAXONOMY = {
  "jee-main": {
    "name": "JEE Main",
    "subjects": [
      {
        "name": "Physics",
        "slug": "physics",
        "chapters": [
          {
            "name": "Physical World",
            "slug": "physical-world",
            "topics": [
              {
                "name": "Physics and Its Scope",
                "slug": "physics-scope"
              },
              {
                "name": "Fundamental Forces — Gravitational, Electromagnetic, Strong, Weak",
                "slug": "fundamental-forces"
              },
              {
                "name": "Nature of Physical Laws",
                "slug": "physical-laws"
              }
            ]
          },
          {
            "name": "Units and Measurements",
            "slug": "units-and-measurements",
            "topics": [
              {
                "name": "Physical Quantities — Fundamental and Derived",
                "slug": "fundamental-derived"
              },
              {
                "name": "SI Units and Their Definitions",
                "slug": "si-units"
              },
              {
                "name": "Dimensional Formula and Dimensional Equation",
                "slug": "dimensional-formula"
              },
              {
                "name": "Dimensional Analysis — Checking Consistency",
                "slug": "dimensional-consistency"
              },
              {
                "name": "Dimensional Analysis — Deriving Relations",
                "slug": "dimensional-deriving"
              },
              {
                "name": "Dimensional Analysis — Conversion of Units",
                "slug": "dimensional-conversion"
              },
              {
                "name": "Significant Figures and Rules",
                "slug": "significant-figures"
              },
              {
                "name": "Rounding Off Numbers",
                "slug": "rounding-off"
              },
              {
                "name": "Types of Errors — Systematic and Random",
                "slug": "error-types"
              },
              {
                "name": "Absolute, Relative and Percentage Error",
                "slug": "absolute-relative-error"
              }
            ]
          },
          {
            "name": "Motion in a Straight Line",
            "slug": "motion-straight-line",
            "topics": [
              {
                "name": "Position, Path Length and Displacement",
                "slug": "position-displacement"
              },
              {
                "name": "Average Velocity and Instantaneous Velocity",
                "slug": "velocity-types"
              },
              {
                "name": "Average Acceleration and Instantaneous Acceleration",
                "slug": "acceleration-types"
              },
              {
                "name": "Uniformly Accelerated Motion",
                "slug": "uniformly-accelerated"
              },
              {
                "name": "Kinematic Equations (v=u+at, s=ut+½at², v²=u²+2as)",
                "slug": "kinematic-equations"
              },
              {
                "name": "x-t, v-t and a-t Graphs — Analysis",
                "slug": "motion-graphs"
              },
              {
                "name": "Area under v-t Graph (Displacement)",
                "slug": "area-vt-graph"
              },
              {
                "name": "Free Fall and Motion Under Gravity",
                "slug": "free-fall"
              },
              {
                "name": "Reaction Time",
                "slug": "reaction-time"
              },
              {
                "name": "Relative Motion in 1D",
                "slug": "relative-motion-1d"
              }
            ]
          },
          {
            "name": "Motion in a Plane",
            "slug": "motion-plane",
            "topics": [
              {
                "name": "Scalars and Vectors — Definitions and Types",
                "slug": "scalars-vectors"
              },
              {
                "name": "Vector Addition — Triangle Law and Parallelogram Law",
                "slug": "vector-addition-laws"
              },
              {
                "name": "Resolution of Vectors into Components",
                "slug": "vector-resolution"
              },
              {
                "name": "Unit Vector and Position Vector",
                "slug": "unit-position-vector"
              },
              {
                "name": "Dot Product — Definition, Formula and Properties",
                "slug": "dot-product"
              },
              {
                "name": "Cross Product — Definition, Formula and Properties",
                "slug": "cross-product"
              },
              {
                "name": "Projectile Motion — Derivations (ToF, Range, Hmax)",
                "slug": "projectile-tof-range"
              },
              {
                "name": "Equation of Trajectory",
                "slug": "trajectory-equation"
              },
              {
                "name": "Projectile on Inclined Plane",
                "slug": "projectile-inclined"
              },
              {
                "name": "Uniform Circular Motion — Angular Quantities",
                "slug": "ucm-angular"
              }
            ]
          },
          {
            "name": "Laws of Motion",
            "slug": "laws-of-motion",
            "topics": [
              {
                "name": "Aristotle's Fallacy and Galileo's Law of Inertia",
                "slug": "aristotle-galileo"
              },
              {
                "name": "Newton's First Law — Inertia and Its Types",
                "slug": "first-law-inertia"
              },
              {
                "name": "Newton's Second Law — F = ma",
                "slug": "second-law-fma"
              },
              {
                "name": "Newton's Third Law and Action-Reaction Pairs",
                "slug": "third-law"
              },
              {
                "name": "Impulse and Impulsive Force",
                "slug": "impulse"
              },
              {
                "name": "Law of Conservation of Linear Momentum",
                "slug": "conservation-momentum"
              },
              {
                "name": "Free Body Diagram (FBD)",
                "slug": "fbd"
              },
              {
                "name": "Normal Force, Tension and Spring Force",
                "slug": "normal-tension-spring"
              },
              {
                "name": "Friction — Static, Kinetic and Rolling",
                "slug": "friction-types"
              },
              {
                "name": "Coefficient of Friction, Angle of Friction and Repose",
                "slug": "friction-coefficients"
              }
            ]
          },
          {
            "name": "Work, Energy and Power",
            "slug": "work-energy-power",
            "topics": [
              {
                "name": "Work Done by Constant and Variable Force",
                "slug": "work-constant-variable"
              },
              {
                "name": "Work-Energy Theorem",
                "slug": "work-energy-theorem"
              },
              {
                "name": "Kinetic Energy",
                "slug": "kinetic-energy"
              },
              {
                "name": "Gravitational Potential Energy",
                "slug": "gravitational-pe"
              },
              {
                "name": "Elastic Potential Energy in Spring (½kx²)",
                "slug": "spring-pe"
              },
              {
                "name": "Conservative and Non-Conservative Forces",
                "slug": "conservative-forces"
              },
              {
                "name": "Conservation of Mechanical Energy",
                "slug": "conservation-mech-energy"
              },
              {
                "name": "Power — Average and Instantaneous",
                "slug": "power-avg-inst"
              },
              {
                "name": "Collisions — Elastic and Inelastic in 1D",
                "slug": "elastic-inelastic-1d"
              },
              {
                "name": "Oblique Collisions (2D)",
                "slug": "oblique-collisions"
              }
            ]
          },
          {
            "name": "System of Particles and Rotational Motion",
            "slug": "rotational-motion",
            "topics": [
              {
                "name": "Centre of Mass — Discrete and Continuous Systems",
                "slug": "centre-of-mass"
              },
              {
                "name": "COM of Standard Bodies (Rod, Disc, Sphere, Cone, Triangle)",
                "slug": "com-standard-bodies"
              },
              {
                "name": "Motion of Centre of Mass",
                "slug": "com-motion"
              },
              {
                "name": "Angular Displacement, Velocity and Acceleration",
                "slug": "angular-kinematics"
              },
              {
                "name": "Equations of Rotational Motion",
                "slug": "rotational-equations"
              },
              {
                "name": "Torque — Definition and τ = Iα",
                "slug": "torque"
              },
              {
                "name": "Moment of Inertia — Definition and Physical Significance",
                "slug": "moi-definition"
              },
              {
                "name": "MI of Standard Bodies — Rod, Ring, Disc, Sphere, Cylinder",
                "slug": "moi-standard-bodies"
              },
              {
                "name": "Theorem of Parallel Axes",
                "slug": "parallel-axis-theorem"
              },
              {
                "name": "Theorem of Perpendicular Axes",
                "slug": "perpendicular-axis-theorem"
              }
            ]
          },
          {
            "name": "Gravitation",
            "slug": "gravitation",
            "topics": [
              {
                "name": "Kepler's Laws of Planetary Motion",
                "slug": "keplers-laws"
              },
              {
                "name": "Newton's Universal Law of Gravitation",
                "slug": "newtons-gravitation"
              },
              {
                "name": "Acceleration Due to Gravity (g) on Earth's Surface",
                "slug": "g-surface"
              },
              {
                "name": "Variation of g with Altitude",
                "slug": "g-altitude"
              },
              {
                "name": "Variation of g with Depth",
                "slug": "g-depth"
              },
              {
                "name": "Variation of g with Latitude and Rotation of Earth",
                "slug": "g-latitude-rotation"
              },
              {
                "name": "Gravitational Field Intensity",
                "slug": "gravitational-field"
              },
              {
                "name": "Gravitational Potential",
                "slug": "gravitational-potential"
              },
              {
                "name": "Gravitational Potential Energy",
                "slug": "gravitational-pe"
              },
              {
                "name": "Escape Velocity",
                "slug": "escape-velocity"
              }
            ]
          },
          {
            "name": "Mechanical Properties of Solids",
            "slug": "mechanical-properties-solids",
            "topics": [
              {
                "name": "Elasticity and Plasticity",
                "slug": "elasticity-plasticity"
              },
              {
                "name": "Types of Stress — Tensile, Compressive, Shear, Bulk",
                "slug": "stress-types"
              },
              {
                "name": "Types of Strain — Longitudinal, Shear, Volumetric",
                "slug": "strain-types"
              },
              {
                "name": "Stress-Strain Curve — Elastic Limit, Yield Point, UTS",
                "slug": "stress-strain-curve"
              },
              {
                "name": "Hooke's Law",
                "slug": "hookes-law"
              },
              {
                "name": "Young's Modulus — Definition and Numericals",
                "slug": "youngs-modulus"
              },
              {
                "name": "Bulk Modulus — Definition and Compressibility",
                "slug": "bulk-modulus"
              },
              {
                "name": "Shear Modulus (Modulus of Rigidity)",
                "slug": "shear-modulus"
              },
              {
                "name": "Poisson's Ratio",
                "slug": "poissons-ratio"
              },
              {
                "name": "Relations Among Elastic Constants",
                "slug": "elastic-constants-relation"
              }
            ]
          },
          {
            "name": "Mechanical Properties of Fluids",
            "slug": "mechanical-properties-fluids",
            "topics": [
              {
                "name": "Pressure — Thrust and Pressure in Fluid",
                "slug": "pressure-fluid"
              },
              {
                "name": "Pascal's Law and Its Applications",
                "slug": "pascals-law"
              },
              {
                "name": "Atmospheric Pressure — Gauge and Absolute",
                "slug": "atmospheric-gauge"
              },
              {
                "name": "Archimedes' Principle",
                "slug": "archimedes-principle"
              },
              {
                "name": "Buoyancy, Apparent Weight and Law of Floatation",
                "slug": "buoyancy-floatation"
              },
              {
                "name": "Equation of Continuity (A₁v₁ = A₂v₂)",
                "slug": "continuity-equation"
              },
              {
                "name": "Bernoulli's Theorem — Derivation and Applications",
                "slug": "bernoullis-theorem"
              },
              {
                "name": "Venturimeter and Pitot Tube",
                "slug": "venturimeter-pitot"
              },
              {
                "name": "Torricelli's Theorem and Speed of Efflux",
                "slug": "torricelli-efflux"
              },
              {
                "name": "Dynamic Lift — Magnus Effect, Aerofoil",
                "slug": "dynamic-lift"
              }
            ]
          },
          {
            "name": "Thermal Properties of Matter",
            "slug": "thermal-properties",
            "topics": [
              {
                "name": "Temperature Scales — Celsius, Kelvin, Fahrenheit",
                "slug": "temperature-scales"
              },
              {
                "name": "Thermal Expansion of Solids — α (Linear), β (Superficial), γ (Volumetric)",
                "slug": "expansion-solids"
              },
              {
                "name": "Thermal Expansion of Liquids — Absolute and Apparent",
                "slug": "expansion-liquids"
              },
              {
                "name": "Anomalous Expansion of Water",
                "slug": "anomalous-expansion"
              },
              {
                "name": "Thermal Expansion of Gases",
                "slug": "expansion-gases"
              },
              {
                "name": "Specific Heat Capacity and Heat Capacity",
                "slug": "specific-heat"
              },
              {
                "name": "Calorimetry — Principle and Numericals",
                "slug": "calorimetry"
              },
              {
                "name": "Latent Heat of Fusion and Vaporisation",
                "slug": "latent-heat"
              },
              {
                "name": "Heating and Cooling Curves",
                "slug": "heating-cooling-curve"
              },
              {
                "name": "Change of State — Melting, Boiling, Sublimation",
                "slug": "change-of-state"
              }
            ]
          },
          {
            "name": "Thermodynamics",
            "slug": "thermodynamics",
            "topics": [
              {
                "name": "Thermodynamic System — Types and State Variables",
                "slug": "system-state-variables"
              },
              {
                "name": "Zeroth Law and Thermal Equilibrium",
                "slug": "zeroth-law"
              },
              {
                "name": "Internal Energy",
                "slug": "internal-energy"
              },
              {
                "name": "First Law — ΔU = Q - W (Both Sign Conventions)",
                "slug": "first-law"
              },
              {
                "name": "Work Done by Gas — PV Diagram Analysis",
                "slug": "work-pv-diagram"
              },
              {
                "name": "Isothermal Process",
                "slug": "isothermal"
              },
              {
                "name": "Adiabatic Process — γ, Relations and Equations",
                "slug": "adiabatic"
              },
              {
                "name": "Isochoric Process",
                "slug": "isochoric"
              },
              {
                "name": "Isobaric Process",
                "slug": "isobaric"
              },
              {
                "name": "Polytropic Process",
                "slug": "polytropic"
              }
            ]
          },
          {
            "name": "Kinetic Theory",
            "slug": "kinetic-theory",
            "topics": [
              {
                "name": "Molecular Nature of Matter",
                "slug": "molecular-nature"
              },
              {
                "name": "Assumptions of Kinetic Theory of Gases",
                "slug": "kinetic-assumptions"
              },
              {
                "name": "Pressure Exerted by an Ideal Gas",
                "slug": "pressure-ideal-gas"
              },
              {
                "name": "Kinetic Interpretation of Temperature",
                "slug": "temperature-kinetic"
              },
              {
                "name": "RMS Speed (vrms)",
                "slug": "rms-speed"
              },
              {
                "name": "Mean Speed (v̄)",
                "slug": "mean-speed"
              },
              {
                "name": "Most Probable Speed (vp)",
                "slug": "most-probable-speed"
              },
              {
                "name": "Ratio of Speeds — vp : v̄ : vrms",
                "slug": "speed-ratios"
              },
              {
                "name": "Maxwell's Distribution of Speeds",
                "slug": "maxwell-distribution"
              },
              {
                "name": "Degrees of Freedom",
                "slug": "degrees-of-freedom"
              }
            ]
          },
          {
            "name": "Oscillations",
            "slug": "oscillations",
            "topics": [
              {
                "name": "Periodic and Oscillatory Motion",
                "slug": "periodic-oscillatory"
              },
              {
                "name": "SHM — Definition and Examples",
                "slug": "shm-definition"
              },
              {
                "name": "SHM — Differential Equation (d²x/dt² = -ω²x)",
                "slug": "shm-diff-equation"
              },
              {
                "name": "Displacement, Velocity and Acceleration in SHM",
                "slug": "shm-dva"
              },
              {
                "name": "Phase — Initial Phase and Phase Difference",
                "slug": "shm-phase"
              },
              {
                "name": "KE and PE in SHM",
                "slug": "ke-pe-shm"
              },
              {
                "name": "Total Energy in SHM (E = ½mω²A²)",
                "slug": "total-energy-shm"
              },
              {
                "name": "Spring-Mass System — T = 2π√(m/k)",
                "slug": "spring-mass-system"
              },
              {
                "name": "Springs in Series and Parallel",
                "slug": "springs-combinations"
              },
              {
                "name": "Simple Pendulum — T = 2π√(L/g)",
                "slug": "simple-pendulum"
              }
            ]
          },
          {
            "name": "Waves",
            "slug": "waves",
            "topics": [
              {
                "name": "Transverse and Longitudinal Waves",
                "slug": "transverse-longitudinal"
              },
              {
                "name": "Wave Parameters — Amplitude, Wavelength, Frequency, Period",
                "slug": "wave-parameters"
              },
              {
                "name": "Wave Equation — y = A sin(kx - ωt)",
                "slug": "wave-equation"
              },
              {
                "name": "Speed of Transverse Wave in String (v = √T/μ)",
                "slug": "speed-string"
              },
              {
                "name": "Speed of Longitudinal Wave in Medium",
                "slug": "speed-longitudinal"
              },
              {
                "name": "Speed of Sound — Newton and Laplace Formula",
                "slug": "speed-sound"
              },
              {
                "name": "Intensity of Wave (I ∝ A²)",
                "slug": "wave-intensity"
              },
              {
                "name": "Principle of Superposition of Waves",
                "slug": "superposition"
              },
              {
                "name": "Reflection at Fixed End (Phase Change) and Free End",
                "slug": "wave-reflection"
              },
              {
                "name": "Standing Waves — Condition and Formation",
                "slug": "standing-waves"
              }
            ]
          },
          {
            "name": "Electric Charges and Fields",
            "slug": "electric-charges-fields",
            "topics": [
              {
                "name": "Electric Charge — Properties and Conservation",
                "slug": "charge-properties"
              },
              {
                "name": "Conductors, Insulators and Semiconductors",
                "slug": "conductors-insulators"
              },
              {
                "name": "Methods of Charging — Friction, Conduction, Induction",
                "slug": "charging-methods"
              },
              {
                "name": "Coulomb's Law in Free Space and Medium",
                "slug": "coulombs-law"
              },
              {
                "name": "Superposition Principle for Multiple Charges",
                "slug": "superposition-principle"
              },
              {
                "name": "Electric Field — Definition and Formula",
                "slug": "electric-field-def"
              },
              {
                "name": "Electric Field due to Point Charge",
                "slug": "field-point-charge"
              },
              {
                "name": "Electric Field Lines — Properties",
                "slug": "field-lines"
              },
              {
                "name": "Electric Dipole — Definition and Dipole Moment",
                "slug": "electric-dipole"
              },
              {
                "name": "Field on Axial Line of Dipole",
                "slug": "field-axial-dipole"
              }
            ]
          },
          {
            "name": "Electrostatic Potential and Capacitance",
            "slug": "electrostatic-potential-capacitance",
            "topics": [
              {
                "name": "Electric Potential — Definition, Unit and Formula",
                "slug": "potential-definition"
              },
              {
                "name": "Relation Between E and V (E = -dV/dr)",
                "slug": "e-v-relation"
              },
              {
                "name": "Potential due to Point Charge",
                "slug": "potential-point"
              },
              {
                "name": "Potential due to Electric Dipole — Axial and Equatorial",
                "slug": "potential-dipole"
              },
              {
                "name": "Potential due to System of Charges",
                "slug": "potential-system"
              },
              {
                "name": "Equipotential Surfaces — Properties and Examples",
                "slug": "equipotential-surfaces"
              },
              {
                "name": "Potential Energy of System of Charges",
                "slug": "pe-system-charges"
              },
              {
                "name": "Potential Energy of Dipole in External Field",
                "slug": "pe-dipole-field"
              },
              {
                "name": "Conductors in Electrostatic Equilibrium",
                "slug": "conductors-equilibrium"
              },
              {
                "name": "Dielectrics — Polar and Non-Polar",
                "slug": "dielectrics-types"
              }
            ]
          },
          {
            "name": "Current Electricity",
            "slug": "current-electricity",
            "topics": [
              {
                "name": "Electric Current and Conventional Current",
                "slug": "electric-current"
              },
              {
                "name": "Drift Velocity and Mobility",
                "slug": "drift-velocity-mobility"
              },
              {
                "name": "Relation Between Current and Drift Velocity",
                "slug": "current-drift-relation"
              },
              {
                "name": "Ohm's Law — Statement and Limitations",
                "slug": "ohms-law"
              },
              {
                "name": "Resistance — Definition, Resistivity and Conductivity",
                "slug": "resistance-resistivity"
              },
              {
                "name": "Variation of Resistance with Temperature — α",
                "slug": "resistance-temperature"
              },
              {
                "name": "Colour Code for Resistors",
                "slug": "colour-code"
              },
              {
                "name": "Resistors in Series",
                "slug": "resistors-series"
              },
              {
                "name": "Resistors in Parallel",
                "slug": "resistors-parallel"
              },
              {
                "name": "Kirchhoff's Current Law (KCL / Junction Rule)",
                "slug": "kcl"
              }
            ]
          },
          {
            "name": "Moving Charges and Magnetism",
            "slug": "moving-charges-magnetism",
            "topics": [
              {
                "name": "Magnetic Field — Concept, Biot-Savart Law",
                "slug": "biot-savart-law"
              },
              {
                "name": "Magnetic Field due to Straight Finite and Infinite Wire",
                "slug": "field-wire"
              },
              {
                "name": "Magnetic Field on Axis of Circular Current Loop",
                "slug": "field-circular-loop"
              },
              {
                "name": "Ampere's Circuital Law",
                "slug": "amperes-law"
              },
              {
                "name": "Magnetic Field Inside Solenoid",
                "slug": "field-solenoid"
              },
              {
                "name": "Magnetic Field of Toroid",
                "slug": "field-toroid"
              },
              {
                "name": "Force on Moving Charge in Magnetic Field (F = qv × B)",
                "slug": "force-charge"
              },
              {
                "name": "Motion of Charged Particle — Circle, Helix",
                "slug": "particle-motion"
              },
              {
                "name": "Cyclotron — Principle, Working and Limitations",
                "slug": "cyclotron"
              },
              {
                "name": "Force on Current-Carrying Conductor in B",
                "slug": "force-conductor"
              }
            ]
          },
          {
            "name": "Magnetism and Matter",
            "slug": "magnetism-matter",
            "topics": [
              {
                "name": "Bar Magnet — Properties and Pole Strength",
                "slug": "bar-magnet"
              },
              {
                "name": "Axial Field of Bar Magnet",
                "slug": "magnet-axial-field"
              },
              {
                "name": "Equatorial Field of Bar Magnet",
                "slug": "magnet-equatorial-field"
              },
              {
                "name": "Torque on Magnetic Dipole in Uniform B",
                "slug": "magnet-torque"
              },
              {
                "name": "Potential Energy of Dipole in B",
                "slug": "dipole-pe"
              },
              {
                "name": "Gauss's Law for Magnetism",
                "slug": "gauss-magnetism"
              },
              {
                "name": "Bar Magnet as Equivalent Solenoid",
                "slug": "magnet-solenoid-equiv"
              },
              {
                "name": "Earth's Magnetic Field — Components (BH, BV, δ, I)",
                "slug": "earth-field-components"
              },
              {
                "name": "Magnetic Properties — I, H, χ, μ",
                "slug": "magnetic-properties"
              },
              {
                "name": "Diamagnetic Materials",
                "slug": "diamagnetic"
              }
            ]
          },
          {
            "name": "Electromagnetic Induction",
            "slug": "em-induction",
            "topics": [
              {
                "name": "Magnetic Flux (Φ = B·A cosθ)",
                "slug": "magnetic-flux"
              },
              {
                "name": "Faraday's First and Second Laws of Induction",
                "slug": "faradays-laws"
              },
              {
                "name": "Lenz's Law and Conservation of Energy",
                "slug": "lenzs-law"
              },
              {
                "name": "Motional EMF (ε = Bvl)",
                "slug": "motional-emf"
              },
              {
                "name": "EMF in Rotating Coil",
                "slug": "rotating-coil-emf"
              },
              {
                "name": "Eddy Currents — Causes, Effects and Uses",
                "slug": "eddy-currents"
              },
              {
                "name": "Self-Inductance (L) and Self-Induced EMF",
                "slug": "self-inductance"
              },
              {
                "name": "Self-Inductance of Solenoid (L = μ₀n²V)",
                "slug": "self-inductance-solenoid"
              },
              {
                "name": "Mutual Inductance (M) and Mutually Induced EMF",
                "slug": "mutual-inductance"
              },
              {
                "name": "Coefficient of Coupling",
                "slug": "coupling-coefficient"
              }
            ]
          },
          {
            "name": "Alternating Current",
            "slug": "alternating-current",
            "topics": [
              {
                "name": "AC Voltage — Amplitude, Angular Frequency, Phase",
                "slug": "ac-basics"
              },
              {
                "name": "Peak, RMS and Average Value",
                "slug": "ac-peak-rms-avg"
              },
              {
                "name": "AC through Pure Resistor",
                "slug": "ac-resistor"
              },
              {
                "name": "AC through Pure Inductor — Inductive Reactance (XL)",
                "slug": "ac-inductor"
              },
              {
                "name": "AC through Pure Capacitor — Capacitive Reactance (XC)",
                "slug": "ac-capacitor"
              },
              {
                "name": "Phasor Diagram — LR, RC and LC Circuits",
                "slug": "phasor-diagrams"
              },
              {
                "name": "Series RLC Circuit — Impedance Z",
                "slug": "series-rlc-impedance"
              },
              {
                "name": "Resonance in Series RLC — f₀ = 1/(2π√LC)",
                "slug": "series-resonance"
              },
              {
                "name": "Bandwidth and Quality Factor (Q)",
                "slug": "bandwidth-q-factor"
              },
              {
                "name": "Power in AC — Apparent, Real and Reactive Power",
                "slug": "power-ac-types"
              }
            ]
          },
          {
            "name": "Electromagnetic Waves",
            "slug": "em-waves",
            "topics": [
              {
                "name": "Need for Displacement Current — Limitation of Ampere's Law",
                "slug": "displacement-current-need"
              },
              {
                "name": "Displacement Current (Id = ε₀ dΦE/dt)",
                "slug": "displacement-current"
              },
              {
                "name": "Maxwell's Equations (Qualitative)",
                "slug": "maxwells-equations"
              },
              {
                "name": "EM Wave — Transverse Nature and Properties",
                "slug": "em-wave-properties"
              },
              {
                "name": "Speed of EM Waves (c = 1/√μ₀ε₀)",
                "slug": "em-wave-speed"
              },
              {
                "name": "Energy, Intensity and Momentum of EM Waves",
                "slug": "em-energy-momentum"
              },
              {
                "name": "EM Spectrum — Gamma, X-ray, UV, Visible, IR, Microwave, Radio",
                "slug": "em-spectrum-regions"
              },
              {
                "name": "Wavelength Range and Applications of Each Region",
                "slug": "em-spectrum-applications"
              }
            ]
          },
          {
            "name": "Ray Optics and Optical Instruments",
            "slug": "ray-optics",
            "topics": [
              {
                "name": "Reflection at Plane Mirror — Image Properties",
                "slug": "plane-mirror-image"
              },
              {
                "name": "Reflection at Spherical Mirror — Sign Convention",
                "slug": "spherical-mirror-convention"
              },
              {
                "name": "Mirror Formula (1/v + 1/u = 1/f)",
                "slug": "mirror-formula"
              },
              {
                "name": "Magnification by Spherical Mirror",
                "slug": "mirror-magnification"
              },
              {
                "name": "Refraction — Snell's Law",
                "slug": "snells-law"
              },
              {
                "name": "Refractive Index — Absolute and Relative",
                "slug": "refractive-index"
              },
              {
                "name": "Total Internal Reflection and Critical Angle",
                "slug": "tir-critical-angle"
              },
              {
                "name": "Applications of TIR — Optical Fibre, Diamond, Mirage",
                "slug": "tir-applications"
              },
              {
                "name": "Refraction at Spherical Surfaces",
                "slug": "refraction-spherical"
              },
              {
                "name": "Thin Lens Formula (1/v - 1/u = 1/f)",
                "slug": "thin-lens-formula"
              }
            ]
          },
          {
            "name": "Wave Optics",
            "slug": "wave-optics",
            "topics": [
              {
                "name": "Huygens' Principle",
                "slug": "huygens-principle"
              },
              {
                "name": "Coherent Sources",
                "slug": "coherent-sources"
              },
              {
                "name": "Young's Double Slit Experiment (YDSE) — Setup",
                "slug": "ydse-setup"
              },
              {
                "name": "Fringe Width β = λD/d",
                "slug": "fringe-width"
              },
              {
                "name": "Conditions for Bright and Dark Fringes",
                "slug": "bright-dark-fringes"
              },
              {
                "name": "Intensity Distribution in YDSE",
                "slug": "ydse-intensity"
              },
              {
                "name": "Effect of Thin Film in YDSE Path",
                "slug": "ydse-thin-film"
              },
              {
                "name": "Diffraction at Single Slit",
                "slug": "single-slit-diffraction"
              },
              {
                "name": "Width of Central Maximum (2λD/d)",
                "slug": "central-max-width"
              },
              {
                "name": "Resolving Power of Microscope and Telescope",
                "slug": "resolving-power"
              }
            ]
          },
          {
            "name": "Dual Nature of Radiation and Matter",
            "slug": "dual-nature",
            "topics": [
              {
                "name": "Photoelectric Effect — Discovery and Observations",
                "slug": "pe-discovery"
              },
              {
                "name": "Effect of Intensity, Frequency and Potential",
                "slug": "pe-effects"
              },
              {
                "name": "Failure of Classical Wave Theory",
                "slug": "wave-theory-failure"
              },
              {
                "name": "Einstein's Photoelectric Equation (Kmax = hν - φ)",
                "slug": "einsteins-equation"
              },
              {
                "name": "Work Function and Threshold Frequency",
                "slug": "work-function"
              },
              {
                "name": "Stopping Potential and Its Significance",
                "slug": "stopping-potential"
              },
              {
                "name": "de Broglie's Hypothesis (λ = h/mv)",
                "slug": "de-broglie-hypothesis"
              },
              {
                "name": "de Broglie Wavelength of Electron (λ = h/√2mK)",
                "slug": "de-broglie-electron"
              },
              {
                "name": "Davisson-Germer Experiment",
                "slug": "davisson-germer"
              },
              {
                "name": "Heisenberg's Uncertainty Principle (Δx·Δp ≥ h/4π)",
                "slug": "uncertainty-principle"
              }
            ]
          },
          {
            "name": "Atoms",
            "slug": "atoms",
            "topics": [
              {
                "name": "Thomson's Model and Its Failure",
                "slug": "thomson-model"
              },
              {
                "name": "Rutherford's α-Scattering Experiment",
                "slug": "alpha-scattering"
              },
              {
                "name": "Rutherford's Nuclear Model and Limitations",
                "slug": "rutherford-model"
              },
              {
                "name": "Bohr's Postulates",
                "slug": "bohr-postulates"
              },
              {
                "name": "Bohr's Radii (rn = n²a₀)",
                "slug": "bohr-radii"
              },
              {
                "name": "Bohr's Velocities (vn = v₀/n)",
                "slug": "bohr-velocities"
              },
              {
                "name": "Bohr's Energy Levels (En = -13.6/n² eV)",
                "slug": "bohr-energy-levels"
              },
              {
                "name": "Emission and Absorption Spectra",
                "slug": "emission-absorption"
              },
              {
                "name": "Hydrogen Spectral Series — Lyman, Balmer, Paschen, Brackett, Pfund",
                "slug": "spectral-series"
              },
              {
                "name": "Excitation Energy and Ionisation Energy",
                "slug": "excitation-ionisation"
              }
            ]
          },
          {
            "name": "Nuclei",
            "slug": "nuclei",
            "topics": [
              {
                "name": "Composition of Nucleus — Protons and Neutrons",
                "slug": "nucleus-composition"
              },
              {
                "name": "Atomic Mass Unit (amu) and Energy Equivalent",
                "slug": "amu-energy"
              },
              {
                "name": "Nuclear Size — R = R₀A^(1/3)",
                "slug": "nuclear-size"
              },
              {
                "name": "Nuclear Density",
                "slug": "nuclear-density"
              },
              {
                "name": "Mass Defect (Δm)",
                "slug": "mass-defect"
              },
              {
                "name": "Binding Energy (ΔmC²)",
                "slug": "binding-energy"
              },
              {
                "name": "Binding Energy per Nucleon — Graph and Significance",
                "slug": "be-nucleon-graph"
              },
              {
                "name": "Radioactivity — Discovery and Properties",
                "slug": "radioactivity"
              },
              {
                "name": "Alpha Decay — Equation and Q-Value",
                "slug": "alpha-decay"
              },
              {
                "name": "Beta Decay (β⁻ and β⁺) — Neutrino",
                "slug": "beta-decay"
              }
            ]
          },
          {
            "name": "Semiconductor Electronics: Materials, Devices and Simple Circuits",
            "slug": "semiconductor-electronics",
            "topics": [
              {
                "name": "Energy Bands — Valence, Conduction, Band Gap",
                "slug": "energy-bands"
              },
              {
                "name": "Classification — Metals, Semiconductors, Insulators",
                "slug": "band-classification"
              },
              {
                "name": "Intrinsic Semiconductor — Electron-Hole Pair",
                "slug": "intrinsic-semiconductor"
              },
              {
                "name": "Extrinsic — n-Type Semiconductor (Donor Impurity)",
                "slug": "n-type"
              },
              {
                "name": "Extrinsic — p-Type Semiconductor (Acceptor Impurity)",
                "slug": "p-type"
              },
              {
                "name": "p-n Junction Formation and Depletion Layer",
                "slug": "pn-junction"
              },
              {
                "name": "Potential Barrier",
                "slug": "potential-barrier"
              },
              {
                "name": "Forward Bias and Reverse Bias",
                "slug": "forward-reverse-bias"
              },
              {
                "name": "I-V Characteristics of p-n Junction Diode",
                "slug": "diode-iv-char"
              },
              {
                "name": "Half-Wave Rectifier",
                "slug": "half-wave-rectifier"
              }
            ]
          }
        ]
      },
      {
        "name": "Chemistry",
        "slug": "chemistry",
        "chapters": [
          {
            "name": "Some Basic Concepts of Chemistry",
            "slug": "basic-concepts",
            "topics": [
              {
                "name": "Importance and Nature of Chemistry",
                "slug": "importance-chemistry"
              },
              {
                "name": "Laws of Chemical Combination",
                "slug": "laws-combination"
              },
              {
                "name": "Dalton's Atomic Theory",
                "slug": "daltons-theory"
              },
              {
                "name": "Atomic Mass and Molecular Mass",
                "slug": "atomic-molecular-mass"
              },
              {
                "name": "Mole Concept and Avogadro's Number",
                "slug": "mole-avogadro"
              },
              {
                "name": "Molar Mass",
                "slug": "molar-mass"
              },
              {
                "name": "Percentage Composition",
                "slug": "percentage-composition"
              },
              {
                "name": "Empirical Formula from Percentage Composition",
                "slug": "empirical-from-percent"
              },
              {
                "name": "Molecular Formula from Empirical Formula",
                "slug": "molecular-from-empirical"
              },
              {
                "name": "Stoichiometry and Mole-Mole Relationship",
                "slug": "stoichiometry"
              }
            ]
          },
          {
            "name": "Structure of Atom",
            "slug": "structure-of-atom",
            "topics": [
              {
                "name": "Discovery of Electron — Cathode Ray Experiment",
                "slug": "discovery-electron"
              },
              {
                "name": "Charge-to-Mass Ratio of Electron",
                "slug": "e-m-ratio"
              },
              {
                "name": "Millikan's Oil Drop Experiment — Charge of Electron",
                "slug": "millikan-experiment"
              },
              {
                "name": "Discovery of Proton and Neutron",
                "slug": "proton-neutron"
              },
              {
                "name": "Thomson's Plum Pudding Model",
                "slug": "thomson-model-chem"
              },
              {
                "name": "Rutherford's α-Scattering and Nuclear Model",
                "slug": "rutherford-chem"
              },
              {
                "name": "Atomic Number, Mass Number, Isotopes and Isobars",
                "slug": "atomic-number-isotopes"
              },
              {
                "name": "Electromagnetic Radiation — Wave Nature",
                "slug": "em-radiation-wave"
              },
              {
                "name": "Planck's Quantum Theory and Energy of Photon",
                "slug": "planck-theory"
              },
              {
                "name": "Photoelectric Effect",
                "slug": "photoelectric-chem"
              }
            ]
          },
          {
            "name": "Classification of Elements and Periodicity in Properties",
            "slug": "periodic-table",
            "topics": [
              {
                "name": "History — Döbereiner's Triads, Newlands' Law of Octaves",
                "slug": "history-triads-octaves"
              },
              {
                "name": "Mendeleev's Periodic Table and Its Limitations",
                "slug": "mendeleev-table"
              },
              {
                "name": "Modern Periodic Law and Long Form of Table",
                "slug": "modern-table"
              },
              {
                "name": "s, p, d, f Block Classification",
                "slug": "block-classification"
              },
              {
                "name": "Atomic Radius — Covalent, Metallic, Van der Waals",
                "slug": "atomic-radius-types"
              },
              {
                "name": "Trend of Atomic Radius in Period (Decreases)",
                "slug": "atomic-radius-period"
              },
              {
                "name": "Trend of Atomic Radius in Group (Increases)",
                "slug": "atomic-radius-group"
              },
              {
                "name": "Ionic Radius and Isoelectronic Species",
                "slug": "ionic-radius"
              },
              {
                "name": "Ionisation Enthalpy — Definition",
                "slug": "ie-def"
              },
              {
                "name": "Trends of IE in Period and Group",
                "slug": "ie-trends"
              }
            ]
          },
          {
            "name": "Chemical Bonding and Molecular Structure",
            "slug": "chemical-bonding",
            "topics": [
              {
                "name": "Kossel-Lewis Approach — Octet Rule",
                "slug": "octet-rule"
              },
              {
                "name": "Lewis Dot Structures",
                "slug": "lewis-dot"
              },
              {
                "name": "Exceptions to Octet Rule",
                "slug": "octet-exceptions"
              },
              {
                "name": "Formal Charge Calculation",
                "slug": "formal-charge"
              },
              {
                "name": "Ionic Bond — Formation and Conditions",
                "slug": "ionic-bond"
              },
              {
                "name": "Lattice Enthalpy and Born-Haber Cycle",
                "slug": "lattice-born-haber"
              },
              {
                "name": "Covalent Bond — σ and π Bonds",
                "slug": "sigma-pi-bonds"
              },
              {
                "name": "Bond Parameters — Length, Energy, Angle, Order",
                "slug": "bond-parameters"
              },
              {
                "name": "Polar Covalent Bond and Dipole Moment",
                "slug": "polar-dipole"
              },
              {
                "name": "Resonance Structures and Resonance Energy",
                "slug": "resonance"
              }
            ]
          },
          {
            "name": "States of Matter",
            "slug": "states-of-matter",
            "topics": [
              {
                "name": "Intermolecular Forces and Effect on State",
                "slug": "intermolecular-forces"
              },
              {
                "name": "Boyle's Law",
                "slug": "boyles-law"
              },
              {
                "name": "Charles's Law",
                "slug": "charless-law"
              },
              {
                "name": "Gay-Lussac's Law",
                "slug": "gay-lussac-law"
              },
              {
                "name": "Avogadro's Law and Molar Volume at STP",
                "slug": "avogadros-law"
              },
              {
                "name": "Ideal Gas Equation (PV = nRT)",
                "slug": "ideal-gas-eq"
              },
              {
                "name": "Dalton's Law of Partial Pressure",
                "slug": "daltons-partial-pressure"
              },
              {
                "name": "Kinetic Molecular Theory of Gases",
                "slug": "kmt"
              },
              {
                "name": "Molecular Speed Distribution — Maxwell",
                "slug": "maxwell-speed"
              },
              {
                "name": "RMS, Mean and Most Probable Speed",
                "slug": "speed-types"
              }
            ]
          },
          {
            "name": "Thermodynamics",
            "slug": "thermodynamics-chem",
            "topics": [
              {
                "name": "System, Surroundings — Open, Closed, Isolated",
                "slug": "system-types"
              },
              {
                "name": "Thermodynamic State Functions",
                "slug": "state-functions"
              },
              {
                "name": "Extensive and Intensive Properties",
                "slug": "extensive-intensive"
              },
              {
                "name": "Isothermal, Adiabatic, Isochoric, Isobaric Processes",
                "slug": "thermo-processes"
              },
              {
                "name": "Heat (q) and Work (w) — Sign Conventions",
                "slug": "heat-work-signs"
              },
              {
                "name": "First Law — ΔU = q + w",
                "slug": "first-law-chem"
              },
              {
                "name": "Enthalpy (H = U + pV)",
                "slug": "enthalpy"
              },
              {
                "name": "ΔH = ΔU + ΔngRT",
                "slug": "dh-du-relation"
              },
              {
                "name": "Standard Enthalpy of Formation (ΔfH°)",
                "slug": "standard-formation"
              },
              {
                "name": "Hess's Law of Constant Heat Summation",
                "slug": "hesss-law"
              }
            ]
          },
          {
            "name": "Equilibrium",
            "slug": "equilibrium",
            "topics": [
              {
                "name": "Physical and Chemical Equilibrium",
                "slug": "physical-chemical-eq"
              },
              {
                "name": "Law of Mass Action",
                "slug": "law-mass-action"
              },
              {
                "name": "Kc — Expression and Units",
                "slug": "kc-expression"
              },
              {
                "name": "Kp — Expression and Units",
                "slug": "kp-expression"
              },
              {
                "name": "Relation Between Kc and Kp (Kp = Kc(RT)^Δn)",
                "slug": "kc-kp-relation"
              },
              {
                "name": "Homogeneous and Heterogeneous Equilibrium",
                "slug": "homo-heterogeneous-eq"
              },
              {
                "name": "Characteristics of Equilibrium Constant",
                "slug": "k-characteristics"
              },
              {
                "name": "Reaction Quotient (Qc) and Direction of Reaction",
                "slug": "reaction-quotient"
              },
              {
                "name": "Le Chatelier's Principle",
                "slug": "le-chateliers"
              },
              {
                "name": "Effect of Concentration, Pressure, Temperature on K",
                "slug": "equilibrium-effects"
              }
            ]
          },
          {
            "name": "Redox Reactions",
            "slug": "redox-reactions",
            "topics": [
              {
                "name": "Oxidation and Reduction — Electronic Concept",
                "slug": "oxidation-reduction-def"
              },
              {
                "name": "Oxidation Number — Rules and Calculation",
                "slug": "oxidation-number-rules"
              },
              {
                "name": "Oxidising and Reducing Agents",
                "slug": "oxidising-reducing"
              },
              {
                "name": "Balancing by Oxidation Number Method",
                "slug": "ox-number-balancing"
              },
              {
                "name": "Half-Reaction Method — Acidic Medium",
                "slug": "half-reaction-acidic"
              },
              {
                "name": "Half-Reaction Method — Basic Medium",
                "slug": "half-reaction-basic"
              },
              {
                "name": "Types — Combination, Decomposition, Displacement, Disproportionation",
                "slug": "redox-types"
              },
              {
                "name": "Electrochemical Series and Standard Reduction Potential",
                "slug": "electrochemical-series"
              }
            ]
          },
          {
            "name": "Hydrogen",
            "slug": "hydrogen",
            "topics": [
              {
                "name": "Position of Hydrogen — Unique Character",
                "slug": "hydrogen-unique"
              },
              {
                "name": "Isotopes — Protium, Deuterium (D₂O), Tritium",
                "slug": "hydrogen-isotopes"
              },
              {
                "name": "Preparation of Hydrogen — Laboratory Methods",
                "slug": "hydrogen-lab-prep"
              },
              {
                "name": "Industrial Preparation — Steam Reforming",
                "slug": "hydrogen-industrial"
              },
              {
                "name": "Properties of Molecular Hydrogen",
                "slug": "hydrogen-properties"
              },
              {
                "name": "Hydrides — Ionic, Covalent, Metallic",
                "slug": "hydrides-types"
              },
              {
                "name": "Water — Structure and Unique Properties",
                "slug": "water-structure"
              },
              {
                "name": "Anomalous Expansion of Water",
                "slug": "water-anomalous"
              },
              {
                "name": "Hard Water — Temporary and Permanent",
                "slug": "hard-water"
              },
              {
                "name": "Removal of Hardness",
                "slug": "hardness-removal"
              }
            ]
          },
          {
            "name": "The s-Block Elements",
            "slug": "s-block",
            "topics": [
              {
                "name": "General Characteristics — Electronic Configuration, Properties",
                "slug": "s-block-general"
              },
              {
                "name": "Alkali Metals — Physical Properties and Trends",
                "slug": "alkali-physical"
              },
              {
                "name": "Alkali Metals — Chemical Properties",
                "slug": "alkali-chemical"
              },
              {
                "name": "Anomalous Behaviour of Lithium",
                "slug": "li-anomalous"
              },
              {
                "name": "Diagonal Relationship — Li and Mg",
                "slug": "li-mg-diagonal"
              },
              {
                "name": "NaOH — Preparation (Castner-Kellner) and Properties",
                "slug": "naoh"
              },
              {
                "name": "Na₂CO₃ — Solvay Process and Properties",
                "slug": "na2co3"
              },
              {
                "name": "NaHCO₃ and NaCl",
                "slug": "nahco3-nacl"
              },
              {
                "name": "Alkaline Earth Metals — Physical Properties",
                "slug": "ae-physical"
              },
              {
                "name": "Alkaline Earth Metals — Chemical Properties",
                "slug": "ae-chemical"
              }
            ]
          },
          {
            "name": "The p-Block Elements (Groups 13 and 14)",
            "slug": "p-block-11",
            "topics": [
              {
                "name": "Group 13 — General Properties and Trends",
                "slug": "group13-general"
              },
              {
                "name": "Boron — Allotropes, Structure and Properties",
                "slug": "boron-properties"
              },
              {
                "name": "Borax (Na₂B₄O₇) — Structure and Reactions",
                "slug": "borax"
              },
              {
                "name": "Boric Acid — Structure and Reactions",
                "slug": "boric-acid"
              },
              {
                "name": "Diborane — Structure and Preparation",
                "slug": "diborane"
              },
              {
                "name": "Aluminium — Properties and Reactions",
                "slug": "aluminium"
              },
              {
                "name": "Alums",
                "slug": "alums"
              },
              {
                "name": "Group 14 — General Properties and Trends",
                "slug": "group14-general"
              },
              {
                "name": "Catenation and Allotropy of Carbon",
                "slug": "catenation-allotropy"
              },
              {
                "name": "Diamond — Structure and Properties",
                "slug": "diamond"
              }
            ]
          },
          {
            "name": "Organic Chemistry: Some Basic Principles and Techniques",
            "slug": "organic-basics",
            "topics": [
              {
                "name": "Tetravalency of Carbon — Catenation",
                "slug": "tetravalency"
              },
              {
                "name": "Classification — Acyclic, Cyclic, Aromatic, Heterocyclic",
                "slug": "classification-organic"
              },
              {
                "name": "Functional Groups",
                "slug": "functional-groups"
              },
              {
                "name": "IUPAC Nomenclature — Alkanes",
                "slug": "iupac-alkanes"
              },
              {
                "name": "IUPAC Nomenclature — Alkenes and Alkynes",
                "slug": "iupac-alkenes-alkynes"
              },
              {
                "name": "IUPAC Nomenclature — Functional Group Compounds",
                "slug": "iupac-functional-groups"
              },
              {
                "name": "Chain, Position and Functional Group Isomerism",
                "slug": "structural-isomerism-types"
              },
              {
                "name": "Optical Isomerism — Chirality and Enantiomers",
                "slug": "optical-isomerism"
              },
              {
                "name": "R and S Configuration",
                "slug": "r-s-configuration"
              },
              {
                "name": "Geometrical Isomerism — cis-trans",
                "slug": "cis-trans-isomerism"
              }
            ]
          },
          {
            "name": "Hydrocarbons",
            "slug": "hydrocarbons",
            "topics": [
              {
                "name": "Alkanes — IUPAC Nomenclature and Isomers",
                "slug": "alkanes-nomenclature"
              },
              {
                "name": "Alkanes — Preparation",
                "slug": "alkanes-prep"
              },
              {
                "name": "Alkanes — Physical Properties",
                "slug": "alkanes-physical"
              },
              {
                "name": "Free Radical Halogenation — Mechanism and Selectivity",
                "slug": "free-radical-halogenation"
              },
              {
                "name": "Alkanes — Combustion",
                "slug": "alkanes-combustion"
              },
              {
                "name": "Alkenes — IUPAC and Structural Isomers",
                "slug": "alkenes-nomenclature"
              },
              {
                "name": "Alkenes — Preparation (Dehydration, Dehydrohalogenation)",
                "slug": "alkenes-prep"
              },
              {
                "name": "Mechanism of Electrophilic Addition",
                "slug": "eas-mechanism-alkenes"
              },
              {
                "name": "Markovnikov's Rule",
                "slug": "markovnikov-rule"
              },
              {
                "name": "Anti-Markovnikov (Peroxide Effect / HBr only)",
                "slug": "anti-markovnikov"
              }
            ]
          },
          {
            "name": "Environmental Chemistry",
            "slug": "environmental-chemistry",
            "topics": [
              {
                "name": "Troposphere, Stratosphere, Mesosphere, Thermosphere",
                "slug": "atmospheric-layers"
              },
              {
                "name": "Tropospheric Pollution — Gaseous Pollutants",
                "slug": "gaseous-pollutants"
              },
              {
                "name": "Particulate Pollutants",
                "slug": "particulate-pollutants"
              },
              {
                "name": "Smog — Classical and Photochemical",
                "slug": "smog-types"
              },
              {
                "name": "Acid Rain — Formation and Effects on Ecosystem",
                "slug": "acid-rain"
              },
              {
                "name": "Greenhouse Effect and Global Warming",
                "slug": "greenhouse-global-warming"
              },
              {
                "name": "Ozone Layer — Formation and Depletion (CFCs)",
                "slug": "ozone-layer-depletion"
              },
              {
                "name": "Water Pollution — Industrial, Domestic, Agricultural",
                "slug": "water-pollution-sources"
              },
              {
                "name": "BOD and COD",
                "slug": "bod-cod"
              },
              {
                "name": "Water Treatment",
                "slug": "water-treatment"
              }
            ]
          },
          {
            "name": "The Solid State",
            "slug": "solid-state",
            "topics": [
              {
                "name": "Crystalline vs Amorphous Solids",
                "slug": "crystalline-amorphous"
              },
              {
                "name": "Types of Solids — Ionic, Molecular, Covalent, Metallic",
                "slug": "solid-types"
              },
              {
                "name": "Crystal Lattice and Unit Cell",
                "slug": "crystal-lattice"
              },
              {
                "name": "Primitive (SCC), BCC and FCC Unit Cells",
                "slug": "unit-cell-types"
              },
              {
                "name": "Number of Atoms per Unit Cell",
                "slug": "atoms-per-cell"
              },
              {
                "name": "Packing Efficiency — SCC (52.4%), BCC (68%), FCC (74%)",
                "slug": "packing-efficiency"
              },
              {
                "name": "Tetrahedral and Octahedral Voids",
                "slug": "voids-types"
              },
              {
                "name": "Close Packing in 2D and 3D — HCP and CCP",
                "slug": "close-packing"
              },
              {
                "name": "Density Calculation from Unit Cell",
                "slug": "density-calculation"
              },
              {
                "name": "Structures — NaCl, ZnS (Zinc Blende and Wurtzite), CsCl, Diamond",
                "slug": "ionic-structures"
              }
            ]
          },
          {
            "name": "Solutions",
            "slug": "solutions",
            "topics": [
              {
                "name": "Types of Solutions — Solid, Liquid, Gas",
                "slug": "solution-types"
              },
              {
                "name": "Solubility of Solid in Liquid",
                "slug": "solubility-solid"
              },
              {
                "name": "Henry's Law for Gas Solubility",
                "slug": "henrys-law"
              },
              {
                "name": "Concentration Terms — Molarity, Molality, Mole Fraction, % w/v, ppm",
                "slug": "concentration-terms"
              },
              {
                "name": "Interconversion of Concentration Terms",
                "slug": "concentration-interconversion"
              },
              {
                "name": "Vapour Pressure and Raoult's Law",
                "slug": "raoults-law"
              },
              {
                "name": "Raoult's Law for Volatile-Volatile Mixtures",
                "slug": "raoult-volatile-mix"
              },
              {
                "name": "Ideal and Non-Ideal Solutions",
                "slug": "ideal-nonideal"
              },
              {
                "name": "Positive Deviation (PA > PA° xA)",
                "slug": "positive-deviation"
              },
              {
                "name": "Negative Deviation",
                "slug": "negative-deviation"
              }
            ]
          },
          {
            "name": "Electrochemistry",
            "slug": "electrochemistry",
            "topics": [
              {
                "name": "Electrochemical Cell — Galvanic vs Electrolytic",
                "slug": "cell-types"
              },
              {
                "name": "Daniel Cell — Working and Cell Reaction",
                "slug": "daniel-cell"
              },
              {
                "name": "Cell Notation and Salt Bridge Function",
                "slug": "cell-notation"
              },
              {
                "name": "Standard Electrode Potential (E° at SHE)",
                "slug": "standard-electrode"
              },
              {
                "name": "Cell Potential (E°cell = E°cathode - E°anode)",
                "slug": "cell-potential"
              },
              {
                "name": "Electrochemical Series and Applications",
                "slug": "electrochemical-series"
              },
              {
                "name": "Nernst Equation",
                "slug": "nernst-equation"
              },
              {
                "name": "Equilibrium Constant from E°cell (lnK = nFE°/RT)",
                "slug": "k-from-ecell"
              },
              {
                "name": "Relationship ΔG° = -nFE°",
                "slug": "delta-g-ecell"
              },
              {
                "name": "Electrolysis — Faraday's First Law",
                "slug": "faradays-first"
              }
            ]
          },
          {
            "name": "Chemical Kinetics",
            "slug": "chemical-kinetics",
            "topics": [
              {
                "name": "Rate of Reaction — Average and Instantaneous",
                "slug": "rate-of-reaction"
              },
              {
                "name": "Rate Expression and Rate Constant Units",
                "slug": "rate-expression-units"
              },
              {
                "name": "Factors Affecting Rate",
                "slug": "rate-factors"
              },
              {
                "name": "Rate Law (Rate = k[A]^m[B]^n)",
                "slug": "rate-law"
              },
              {
                "name": "Order of Reaction — Zero, First, Second",
                "slug": "order-types"
              },
              {
                "name": "Molecularity",
                "slug": "molecularity"
              },
              {
                "name": "Integrated Rate Law — Zero Order",
                "slug": "zero-order-integrated"
              },
              {
                "name": "Integrated Rate Law — First Order (k = (2.303/t)log(a/(a-x)))",
                "slug": "first-order-integrated"
              },
              {
                "name": "Half-Life — Zero Order (t₁/₂ = a/2k)",
                "slug": "half-life-zero"
              },
              {
                "name": "Half-Life — First Order (t₁/₂ = 0.693/k)",
                "slug": "half-life-first"
              }
            ]
          },
          {
            "name": "Surface Chemistry",
            "slug": "surface-chemistry",
            "topics": [
              {
                "name": "Adsorption — Physisorption vs Chemisorption",
                "slug": "adsorption-types"
              },
              {
                "name": "Freundlich Adsorption Isotherm",
                "slug": "freundlich-isotherm"
              },
              {
                "name": "Langmuir Adsorption Isotherm",
                "slug": "langmuir-isotherm"
              },
              {
                "name": "Factors Affecting Adsorption",
                "slug": "adsorption-factors"
              },
              {
                "name": "Homogeneous Catalysis",
                "slug": "homogeneous-catalysis"
              },
              {
                "name": "Heterogeneous Catalysis — Mechanism",
                "slug": "heterogeneous-catalysis"
              },
              {
                "name": "Enzyme Catalysis and Lock-Key Mechanism",
                "slug": "enzyme-catalysis"
              },
              {
                "name": "Zeolites",
                "slug": "zeolites"
              },
              {
                "name": "Colloid — Definition, Types and Classification",
                "slug": "colloid-types"
              },
              {
                "name": "Preparation of Colloids — Chemical, Bredig's Arc",
                "slug": "colloid-preparation"
              }
            ]
          },
          {
            "name": "General Principles and Processes of Isolation of Elements",
            "slug": "metallurgy",
            "topics": [
              {
                "name": "Minerals and Ores",
                "slug": "minerals-ores"
              },
              {
                "name": "Concentration — Gravity Separation, Froth Flotation",
                "slug": "concentration-methods"
              },
              {
                "name": "Electromagnetic Separation and Chemical Leaching",
                "slug": "electromagnetic-leaching"
              },
              {
                "name": "Calcination and Roasting",
                "slug": "calcination-roasting"
              },
              {
                "name": "Smelting and Carbon Reduction",
                "slug": "smelting-reduction"
              },
              {
                "name": "Thermodynamic Principles — Ellingham Diagram",
                "slug": "ellingham-diagram"
              },
              {
                "name": "Electrochemical Reduction",
                "slug": "electrochemical-reduction"
              },
              {
                "name": "Refining — Distillation, Liquation",
                "slug": "refining-distillation"
              },
              {
                "name": "Electrolytic Refining",
                "slug": "electrolytic-refining"
              },
              {
                "name": "Zone Refining",
                "slug": "zone-refining"
              }
            ]
          },
          {
            "name": "The p-Block Elements (Groups 15, 16, 17 and 18)",
            "slug": "p-block-12",
            "topics": [
              {
                "name": "Group 15 — General Properties",
                "slug": "group15-general"
              },
              {
                "name": "Nitrogen — Physical and Chemical Properties",
                "slug": "nitrogen-properties"
              },
              {
                "name": "Ammonia — Haber Process, Properties and Uses",
                "slug": "ammonia-haber"
              },
              {
                "name": "Nitric Acid — Ostwald Process, Properties",
                "slug": "nitric-acid-ostwald"
              },
              {
                "name": "Oxides of Nitrogen (N₂O to N₂O₅)",
                "slug": "nitrogen-oxides"
              },
              {
                "name": "Oxoacids of Nitrogen",
                "slug": "oxoacids-nitrogen"
              },
              {
                "name": "Phosphorus — Allotropes",
                "slug": "phosphorus-allotropes"
              },
              {
                "name": "Phosphine (PH₃) — Preparation and Properties",
                "slug": "phosphine"
              },
              {
                "name": "PCl₃ and PCl₅ — Structure and Properties",
                "slug": "pcl3-pcl5"
              },
              {
                "name": "Oxoacids of Phosphorus",
                "slug": "oxoacids-phosphorus"
              }
            ]
          },
          {
            "name": "The d- and f-Block Elements",
            "slug": "d-f-block",
            "topics": [
              {
                "name": "Position and Electronic Configuration",
                "slug": "transition-position"
              },
              {
                "name": "Metallic Character and Melting Point",
                "slug": "transition-metallic"
              },
              {
                "name": "Density and Atomic/Ionic Radius Trend",
                "slug": "transition-radius"
              },
              {
                "name": "Variable Oxidation States and Stability",
                "slug": "variable-oxidation"
              },
              {
                "name": "Ionisation Enthalpy of Transition Metals",
                "slug": "transition-ie"
              },
              {
                "name": "Colour of Transition Metal Compounds",
                "slug": "transition-colour"
              },
              {
                "name": "Magnetic Properties — Spin-Only Formula",
                "slug": "spin-only-formula"
              },
              {
                "name": "Catalytic Properties",
                "slug": "transition-catalysis"
              },
              {
                "name": "Interstitial Compounds",
                "slug": "interstitial-compounds"
              },
              {
                "name": "Alloy Formation",
                "slug": "alloy-formation"
              }
            ]
          },
          {
            "name": "Coordination Compounds",
            "slug": "coordination-compounds",
            "topics": [
              {
                "name": "Werner's Theory of Coordination",
                "slug": "werners-theory"
              },
              {
                "name": "Key Terms — Coordination Entity, Central Atom, Ligand, CN",
                "slug": "key-terms"
              },
              {
                "name": "Types of Ligands — Mono, Bi, Poly, Ambidentate, Chelate",
                "slug": "types-ligands"
              },
              {
                "name": "IUPAC Nomenclature Rules",
                "slug": "iupac-rules-coord"
              },
              {
                "name": "IUPAC Nomenclature — Worked Examples",
                "slug": "iupac-worked"
              },
              {
                "name": "Isomerism — Ionisation Isomerism",
                "slug": "ionisation-isomerism"
              },
              {
                "name": "Hydrate, Linkage, Coordination Isomerism",
                "slug": "hydrate-linkage-coord"
              },
              {
                "name": "Geometric Isomerism — Square Planar and Octahedral",
                "slug": "geometric-isomerism"
              },
              {
                "name": "Optical Isomerism in Coordination Compounds",
                "slug": "optical-isomerism-coord"
              },
              {
                "name": "Valence Bond Theory (VBT) — Inner and Outer Orbital",
                "slug": "vbt-inner-outer"
              }
            ]
          },
          {
            "name": "Haloalkanes and Haloarenes",
            "slug": "haloalkanes-haloarenes",
            "topics": [
              {
                "name": "Classification and IUPAC Nomenclature",
                "slug": "halo-classification-iupac"
              },
              {
                "name": "Nature of C-X Bond and Physical Properties",
                "slug": "cx-bond-properties"
              },
              {
                "name": "Preparation from Alcohols, Alkenes and Alkanes",
                "slug": "halo-preparation"
              },
              {
                "name": "SN1 Mechanism — Steps and Energy Profile",
                "slug": "sn1-mechanism"
              },
              {
                "name": "SN2 Mechanism — Steps and Stereochemistry",
                "slug": "sn2-mechanism"
              },
              {
                "name": "Factors — Substrate, Nucleophile, Solvent, Leaving Group",
                "slug": "sn-factors"
              },
              {
                "name": "Walden Inversion in SN2",
                "slug": "walden-inversion"
              },
              {
                "name": "E1 Elimination Mechanism",
                "slug": "e1-mechanism"
              },
              {
                "name": "E2 Elimination and Zaitsev's Rule",
                "slug": "e2-zaitsev"
              },
              {
                "name": "SN2 vs E2 Competition",
                "slug": "sn2-e2-competition"
              }
            ]
          },
          {
            "name": "Alcohols, Phenols and Ethers",
            "slug": "alcohols-phenols-ethers",
            "topics": [
              {
                "name": "Classification and IUPAC of Alcohols",
                "slug": "alcohol-classification-iupac"
              },
              {
                "name": "Preparation of Monohydric Alcohols",
                "slug": "alcohol-monohydric-prep"
              },
              {
                "name": "Preparation from Grignard Reagent",
                "slug": "grignard-prep"
              },
              {
                "name": "Physical Properties — Boiling Points, Hydrogen Bonding",
                "slug": "alcohol-physical"
              },
              {
                "name": "Chemical Reactions — Acidity of Alcohols",
                "slug": "alcohol-acidity"
              },
              {
                "name": "Esterification (Fischer-Speier)",
                "slug": "esterification"
              },
              {
                "name": "Dehydration — E1 and E2 Pathway",
                "slug": "dehydration"
              },
              {
                "name": "Lucas Test",
                "slug": "lucas-test"
              },
              {
                "name": "Oxidation — Primary to Aldehyde/Acid, Secondary to Ketone",
                "slug": "alcohol-oxidation"
              },
              {
                "name": "Preparation of Phenols",
                "slug": "phenol-prep"
              }
            ]
          },
          {
            "name": "Aldehydes, Ketones and Carboxylic Acids",
            "slug": "aldehydes-ketones-acids",
            "topics": [
              {
                "name": "Nomenclature and Classification",
                "slug": "carbonyl-nomenclature"
              },
              {
                "name": "Preparation of Aldehydes",
                "slug": "aldehyde-prep"
              },
              {
                "name": "Preparation of Ketones",
                "slug": "ketone-prep"
              },
              {
                "name": "Physical Properties",
                "slug": "carbonyl-physical"
              },
              {
                "name": "Nucleophilic Addition — Mechanism",
                "slug": "nucleophilic-addition"
              },
              {
                "name": "Addition of HCN",
                "slug": "addition-hcn"
              },
              {
                "name": "Addition of NaHSO₃",
                "slug": "addition-nahso3"
              },
              {
                "name": "Addition of Grignard Reagent",
                "slug": "addition-grignard"
              },
              {
                "name": "Addition of NH₃ Derivatives",
                "slug": "addition-nh3-derivatives"
              },
              {
                "name": "Reduction — Clemmensen and Wolff-Kishner",
                "slug": "clemmensen-wolff-kishner"
              }
            ]
          },
          {
            "name": "Amines",
            "slug": "amines",
            "topics": [
              {
                "name": "Classification and IUPAC Nomenclature",
                "slug": "amines-nomenclature"
              },
              {
                "name": "Preparation — Gabriel Synthesis",
                "slug": "gabriel-synthesis"
              },
              {
                "name": "Hoffmann Bromamide Degradation",
                "slug": "hoffmann-degradation"
              },
              {
                "name": "Reduction of Nitrogen Compounds",
                "slug": "reduction-nitrogen"
              },
              {
                "name": "Physical Properties",
                "slug": "amines-physical"
              },
              {
                "name": "Basicity — pKb Values",
                "slug": "amines-basicity"
              },
              {
                "name": "Comparison — Aliphatic vs Aromatic Amines",
                "slug": "aliphatic-aromatic-amines"
              },
              {
                "name": "Effect of Substituents on Basicity",
                "slug": "substituent-basicity"
              },
              {
                "name": "Reactions with Acids and Acylation",
                "slug": "amine-acylation"
              },
              {
                "name": "Reaction with Nitrous Acid (Diazotisation)",
                "slug": "diazotisation"
              }
            ]
          },
          {
            "name": "Biomolecules",
            "slug": "biomolecules",
            "topics": [
              {
                "name": "Carbohydrates — Definition and Classification",
                "slug": "carbohydrates-classification"
              },
              {
                "name": "Glucose — Open Chain and Cyclic (Haworth) Structure",
                "slug": "glucose-structure"
              },
              {
                "name": "Fructose Structure and Mutarotation",
                "slug": "fructose-mutarotation"
              },
              {
                "name": "Disaccharides — Sucrose, Maltose, Lactose",
                "slug": "disaccharides"
              },
              {
                "name": "Polysaccharides — Starch, Cellulose, Glycogen",
                "slug": "polysaccharides"
              },
              {
                "name": "Reducing and Non-Reducing Sugars",
                "slug": "reducing-non-reducing"
              },
              {
                "name": "Glycosidic Bond",
                "slug": "glycosidic-bond"
              },
              {
                "name": "Amino Acids — Structure and Classification",
                "slug": "amino-acids-structure"
              },
              {
                "name": "Essential Amino Acids",
                "slug": "essential-amino-acids"
              },
              {
                "name": "Zwitter Ion",
                "slug": "zwitter-ion"
              }
            ]
          },
          {
            "name": "Polymers",
            "slug": "polymers",
            "topics": [
              {
                "name": "Polymer Terminology — Monomer, Repeat Unit, Chain",
                "slug": "polymer-terminology"
              },
              {
                "name": "Classification — Natural, Synthetic, Semi-Synthetic",
                "slug": "polymer-classification-origin"
              },
              {
                "name": "Classification — Addition and Condensation",
                "slug": "polymer-addition-cond"
              },
              {
                "name": "Classification — Biodegradable and Non-Biodegradable",
                "slug": "polymer-biodegradable"
              },
              {
                "name": "Addition Polymerisation — Free Radical Mechanism",
                "slug": "addition-mechanism"
              },
              {
                "name": "Condensation Polymerisation — Mechanism",
                "slug": "condensation-mechanism"
              },
              {
                "name": "Copolymerisation",
                "slug": "copolymerisation"
              },
              {
                "name": "Natural Rubber and Vulcanisation",
                "slug": "rubber-vulcanisation"
              },
              {
                "name": "Synthetic Rubbers — Neoprene, Buna-S, Buna-N",
                "slug": "synthetic-rubbers"
              },
              {
                "name": "Polyethylene — LDPE and HDPE",
                "slug": "polyethylene"
              }
            ]
          },
          {
            "name": "Chemistry in Everyday Life",
            "slug": "chemistry-everyday-life",
            "topics": [
              {
                "name": "Drugs — Definition and Classification",
                "slug": "drugs-classification"
              },
              {
                "name": "Drug-Target Interaction — Enzyme and Receptor",
                "slug": "drug-target-interaction"
              },
              {
                "name": "Analgesics — Narcotics and Non-Narcotics",
                "slug": "analgesics"
              },
              {
                "name": "Tranquilisers",
                "slug": "tranquilisers"
              },
              {
                "name": "Antiseptics and Disinfectants",
                "slug": "antiseptics-disinfectants"
              },
              {
                "name": "Antibiotics — Bactericidal and Bacteriostatic",
                "slug": "antibiotics"
              },
              {
                "name": "Antacids and Antihistamines",
                "slug": "antacids-antihistamines"
              },
              {
                "name": "Antifertility Drugs",
                "slug": "antifertility"
              },
              {
                "name": "Chemicals in Food — Preservatives",
                "slug": "food-preservatives"
              },
              {
                "name": "Artificial Sweeteners",
                "slug": "artificial-sweeteners"
              }
            ]
          }
        ]
      },
      {
        "name": "Mathematics",
        "slug": "mathematics",
        "chapters": [
          {
            "name": "Sets",
            "slug": "sets",
            "topics": [
              {
                "name": "Sets — Definition and Representation (Roster, Set-Builder)",
                "slug": "sets-def-representation"
              },
              {
                "name": "Types of Sets — Empty, Finite, Infinite, Equal, Singleton",
                "slug": "types-sets"
              },
              {
                "name": "Subsets and Power Set",
                "slug": "subsets-power-set"
              },
              {
                "name": "Universal Set and Complement",
                "slug": "universal-complement"
              },
              {
                "name": "Union and Intersection of Sets",
                "slug": "union-intersection"
              },
              {
                "name": "Difference and Symmetric Difference",
                "slug": "difference-symmetric"
              },
              {
                "name": "De Morgan's Laws",
                "slug": "de-morgans-laws"
              },
              {
                "name": "Venn Diagrams and Problems",
                "slug": "venn-diagrams"
              },
              {
                "name": "Cartesian Product of Sets",
                "slug": "cartesian-product"
              },
              {
                "name": "Number of Elements in A∪B, A∩B (Inclusion-Exclusion)",
                "slug": "inclusion-exclusion"
              }
            ]
          },
          {
            "name": "Relations and Functions",
            "slug": "relations-functions",
            "topics": [
              {
                "name": "Ordered Pair and Cartesian Product",
                "slug": "ordered-pair"
              },
              {
                "name": "Relation — Definition, Domain, Range, Codomain",
                "slug": "relation-definition"
              },
              {
                "name": "Types of Relations — Reflexive, Symmetric, Transitive",
                "slug": "relation-types"
              },
              {
                "name": "Equivalence Relation",
                "slug": "equivalence-relation"
              },
              {
                "name": "Function — Definition and Examples",
                "slug": "function-definition"
              },
              {
                "name": "Domain, Codomain and Range",
                "slug": "domain-range"
              },
              {
                "name": "One-One (Injective) Functions",
                "slug": "one-one"
              },
              {
                "name": "Onto (Surjective) and Bijective Functions",
                "slug": "onto-bijective"
              },
              {
                "name": "Number of Functions and Bijections",
                "slug": "counting-functions"
              },
              {
                "name": "Algebra of Functions (Sum, Difference, Product, Quotient)",
                "slug": "algebra-functions"
              }
            ]
          },
          {
            "name": "Trigonometric Functions",
            "slug": "trigonometric-functions",
            "topics": [
              {
                "name": "Measurement of Angles — Radian and Degree",
                "slug": "radian-degree"
              },
              {
                "name": "Arc Length and Area of Sector",
                "slug": "arc-sector"
              },
              {
                "name": "Trigonometric Functions — Definition",
                "slug": "trig-def"
              },
              {
                "name": "Signs of Trig Functions in all Quadrants (ASTC)",
                "slug": "signs-quadrants"
              },
              {
                "name": "Values at Standard Angles (0°, 30°, 45°, 60°, 90°)",
                "slug": "standard-angle-values"
              },
              {
                "name": "Trig Functions of Allied Angles",
                "slug": "allied-angles"
              },
              {
                "name": "Fundamental Identities",
                "slug": "fundamental-identities"
              },
              {
                "name": "Compound Angle Formulae (A+B, A-B)",
                "slug": "compound-angles"
              },
              {
                "name": "Double Angle Formulae (2A)",
                "slug": "double-angle"
              },
              {
                "name": "Triple Angle Formulae (3A)",
                "slug": "triple-angle"
              }
            ]
          },
          {
            "name": "Principle of Mathematical Induction",
            "slug": "mathematical-induction",
            "topics": [
              {
                "name": "Motivation and Principle of Mathematical Induction",
                "slug": "pmi-motivation"
              },
              {
                "name": "Proving Summation Formulae by PMI",
                "slug": "pmi-summation"
              },
              {
                "name": "Proving Divisibility Results by PMI",
                "slug": "pmi-divisibility"
              },
              {
                "name": "Proving Inequalities by PMI",
                "slug": "pmi-inequalities"
              },
              {
                "name": "Second Principle of Induction",
                "slug": "pmi-second"
              }
            ]
          },
          {
            "name": "Complex Numbers and Quadratic Equations",
            "slug": "complex-numbers-quadratic",
            "topics": [
              {
                "name": "Need for Complex Numbers and Imaginary Unit i",
                "slug": "need-complex"
              },
              {
                "name": "Complex Number z = a + ib",
                "slug": "complex-form"
              },
              {
                "name": "Algebra — Addition, Subtraction, Multiplication, Division",
                "slug": "complex-algebra"
              },
              {
                "name": "Modulus and Argument (Principal Value)",
                "slug": "modulus-argument"
              },
              {
                "name": "Polar Form r(cosθ + i sinθ)",
                "slug": "polar-form"
              },
              {
                "name": "Euler's Form re^(iθ)",
                "slug": "euler-form"
              },
              {
                "name": "de Moivre's Theorem and Proof",
                "slug": "de-moivres"
              },
              {
                "name": "Cube Roots of Unity (ω and ω²) and Properties",
                "slug": "cube-roots-unity"
              },
              {
                "name": "nth Roots of Unity",
                "slug": "nth-roots-unity"
              },
              {
                "name": "Locus Problems in Argand Plane",
                "slug": "argand-locus"
              }
            ]
          },
          {
            "name": "Linear Inequalities",
            "slug": "linear-inequalities",
            "topics": [
              {
                "name": "Types of Inequalities and Notation",
                "slug": "inequality-notation"
              },
              {
                "name": "Properties of Inequalities",
                "slug": "inequality-properties"
              },
              {
                "name": "Linear Inequalities in One Variable — Solution",
                "slug": "one-var-ineq"
              },
              {
                "name": "Number Line Representation",
                "slug": "number-line-ineq"
              },
              {
                "name": "Linear Inequalities in Two Variables",
                "slug": "two-var-ineq"
              },
              {
                "name": "Graphical Representation — Half Plane",
                "slug": "half-plane"
              },
              {
                "name": "System of Linear Inequalities — Feasible Region",
                "slug": "feasible-region-ineq"
              },
              {
                "name": "Practical Problems on Inequalities",
                "slug": "practical-ineq"
              }
            ]
          },
          {
            "name": "Permutations and Combinations",
            "slug": "permutations-combinations",
            "topics": [
              {
                "name": "Fundamental Counting Principle",
                "slug": "counting-principle"
              },
              {
                "name": "Factorial Notation",
                "slug": "factorial"
              },
              {
                "name": "Permutation Formula (nPr)",
                "slug": "npr-formula"
              },
              {
                "name": "Permutations with All Objects",
                "slug": "all-objects-perm"
              },
              {
                "name": "Permutations with Restrictions",
                "slug": "restricted-perm"
              },
              {
                "name": "Circular Permutations",
                "slug": "circular-perm"
              },
              {
                "name": "Permutations of Identical Objects",
                "slug": "identical-perm"
              },
              {
                "name": "Combination Formula (nCr)",
                "slug": "ncr-formula"
              },
              {
                "name": "Combinations — Properties and Identities",
                "slug": "ncr-properties"
              },
              {
                "name": "Combinations with Restrictions",
                "slug": "restricted-comb"
              }
            ]
          },
          {
            "name": "Binomial Theorem",
            "slug": "binomial-theorem",
            "topics": [
              {
                "name": "Binomial Theorem for Positive Integer n",
                "slug": "binomial-positive-int"
              },
              {
                "name": "Pascal's Triangle",
                "slug": "pascals-triangle"
              },
              {
                "name": "General Term Tr+1 = nCr · x^(n-r) · y^r",
                "slug": "general-term"
              },
              {
                "name": "Finding a Specific Term",
                "slug": "specific-term"
              },
              {
                "name": "Middle Term(s)",
                "slug": "middle-term"
              },
              {
                "name": "Term Independent of x",
                "slug": "term-independent-x"
              },
              {
                "name": "Properties of Binomial Coefficients",
                "slug": "binomial-coeff-properties"
              },
              {
                "name": "Sum of Coefficients",
                "slug": "sum-coefficients"
              },
              {
                "name": "Binomial Theorem for Rational Index (Approximation)",
                "slug": "rational-index"
              },
              {
                "name": "Greatest Term in Binomial Expansion",
                "slug": "greatest-term"
              }
            ]
          },
          {
            "name": "Sequences and Series",
            "slug": "sequences-series",
            "topics": [
              {
                "name": "Sequence — General Term and Pattern",
                "slug": "sequence-general-term"
              },
              {
                "name": "AP — nth Term (an = a + (n-1)d)",
                "slug": "ap-nth-term"
              },
              {
                "name": "AP — Sum of n Terms (Sn = n/2(2a + (n-1)d))",
                "slug": "ap-sum"
              },
              {
                "name": "AP — Properties",
                "slug": "ap-properties"
              },
              {
                "name": "Insertion of Arithmetic Means",
                "slug": "am-insertion"
              },
              {
                "name": "GP — nth Term (an = ar^(n-1))",
                "slug": "gp-nth-term"
              },
              {
                "name": "GP — Sum of n Terms",
                "slug": "gp-sum"
              },
              {
                "name": "GP — Sum of Infinite Terms (S∞ = a/(1-r), |r|<1)",
                "slug": "gp-infinite-sum"
              },
              {
                "name": "Insertion of Geometric Means",
                "slug": "gm-insertion"
              },
              {
                "name": "HP — nth Term and Problems",
                "slug": "hp-nth-term"
              }
            ]
          },
          {
            "name": "Straight Lines",
            "slug": "straight-lines",
            "topics": [
              {
                "name": "Slope of a Line — Formula and Inclination",
                "slug": "slope-line"
              },
              {
                "name": "Conditions for Parallel and Perpendicular",
                "slug": "parallel-perpendicular-cond"
              },
              {
                "name": "Slope-Intercept Form (y = mx + c)",
                "slug": "slope-intercept-form"
              },
              {
                "name": "Point-Slope Form",
                "slug": "point-slope-form"
              },
              {
                "name": "Two-Point Form",
                "slug": "two-point-form"
              },
              {
                "name": "Intercept Form (x/a + y/b = 1)",
                "slug": "intercept-form"
              },
              {
                "name": "Normal Form (x cosα + y sinα = p)",
                "slug": "normal-form"
              },
              {
                "name": "General Form (ax + by + c = 0)",
                "slug": "general-form"
              },
              {
                "name": "Angle Between Two Lines (tanθ formula)",
                "slug": "angle-two-lines"
              },
              {
                "name": "Distance from Point to Line",
                "slug": "point-line-distance"
              }
            ]
          },
          {
            "name": "Conic Sections",
            "slug": "conic-sections",
            "topics": [
              {
                "name": "Circle — Standard Equation (x²+y²=r²)",
                "slug": "circle-standard"
              },
              {
                "name": "Circle — General Equation",
                "slug": "circle-general"
              },
              {
                "name": "Circle through 3 Points",
                "slug": "circle-3-points"
              },
              {
                "name": "Tangent to Circle — Condition and Equation",
                "slug": "circle-tangent"
              },
              {
                "name": "Normal to Circle",
                "slug": "circle-normal"
              },
              {
                "name": "Chord of Contact (T = 0)",
                "slug": "circle-chord-contact"
              },
              {
                "name": "Family of Circles",
                "slug": "circle-family"
              },
              {
                "name": "Radical Axis",
                "slug": "radical-axis"
              },
              {
                "name": "Parabola — Standard Forms (y²=4ax, x²=4ay)",
                "slug": "parabola-forms"
              },
              {
                "name": "Parabola — Parametric Equations",
                "slug": "parabola-parametric"
              }
            ]
          },
          {
            "name": "Introduction to Three Dimensional Geometry",
            "slug": "intro-3d-geometry",
            "topics": [
              {
                "name": "Coordinate Axes and Planes in 3D",
                "slug": "3d-axes-planes"
              },
              {
                "name": "Coordinates of a Point in Space",
                "slug": "3d-coordinates"
              },
              {
                "name": "Distance Formula in 3D",
                "slug": "3d-distance"
              },
              {
                "name": "Section Formula — Internal Division",
                "slug": "3d-section-internal"
              },
              {
                "name": "Section Formula — External Division",
                "slug": "3d-section-external"
              },
              {
                "name": "Midpoint Formula",
                "slug": "3d-midpoint"
              },
              {
                "name": "Centroid of Triangle and Tetrahedron",
                "slug": "3d-centroid"
              }
            ]
          },
          {
            "name": "Limits and Derivatives",
            "slug": "limits-derivatives",
            "topics": [
              {
                "name": "Intuitive Notion of Limit",
                "slug": "limit-intuition"
              },
              {
                "name": "Left-Hand Limit and Right-Hand Limit",
                "slug": "lhl-rhl"
              },
              {
                "name": "Existence of Limit",
                "slug": "limit-existence"
              },
              {
                "name": "Algebra of Limits",
                "slug": "algebra-limits"
              },
              {
                "name": "Standard Limits — sinx/x, tanx/x, (aˣ-1)/x, (xⁿ-aⁿ)/(x-a)",
                "slug": "standard-limits"
              },
              {
                "name": "Limit at Infinity and Infinite Limits",
                "slug": "limits-infinity"
              },
              {
                "name": "L'Hôpital's Rule",
                "slug": "lhopital-rule"
              },
              {
                "name": "Sandwich Theorem",
                "slug": "sandwich-theorem"
              },
              {
                "name": "Definition of Derivative — First Principles",
                "slug": "first-principles"
              },
              {
                "name": "Rules of Differentiation",
                "slug": "diff-rules"
              }
            ]
          },
          {
            "name": "Mathematical Reasoning",
            "slug": "mathematical-reasoning",
            "topics": [
              {
                "name": "Statements — Simple and Compound",
                "slug": "statements-types"
              },
              {
                "name": "Negation",
                "slug": "negation"
              },
              {
                "name": "Conjunction (∧) and Disjunction (∨)",
                "slug": "conjunction-disjunction"
              },
              {
                "name": "Implication (→) and Biconditional (↔)",
                "slug": "implication-biconditional"
              },
              {
                "name": "Truth Tables",
                "slug": "truth-tables"
              },
              {
                "name": "Tautology and Contradiction",
                "slug": "tautology-contradiction"
              },
              {
                "name": "Converse, Inverse and Contrapositive",
                "slug": "converse-inverse"
              },
              {
                "name": "Quantifiers — For All (∀) and There Exists (∃)",
                "slug": "quantifiers"
              },
              {
                "name": "Validity of Statements — Direct and Contradiction",
                "slug": "proof-methods"
              }
            ]
          },
          {
            "name": "Statistics",
            "slug": "statistics",
            "topics": [
              {
                "name": "Measures of Central Tendency — Mean, Median, Mode",
                "slug": "central-tendency"
              },
              {
                "name": "Mean for Grouped Data",
                "slug": "grouped-mean"
              },
              {
                "name": "Median for Grouped Data",
                "slug": "grouped-median"
              },
              {
                "name": "Mode for Grouped Data",
                "slug": "grouped-mode"
              },
              {
                "name": "Mean Deviation about Mean",
                "slug": "mean-deviation-mean"
              },
              {
                "name": "Mean Deviation about Median",
                "slug": "mean-deviation-median"
              },
              {
                "name": "Variance",
                "slug": "variance"
              },
              {
                "name": "Standard Deviation",
                "slug": "standard-deviation"
              },
              {
                "name": "Coefficient of Variation (CV)",
                "slug": "cv"
              },
              {
                "name": "Comparison of Two Distributions using CV",
                "slug": "compare-cv"
              }
            ]
          },
          {
            "name": "Probability",
            "slug": "probability-11",
            "topics": [
              {
                "name": "Random Experiment and Sample Space",
                "slug": "sample-space"
              },
              {
                "name": "Events — Simple, Compound, Complementary, Impossible",
                "slug": "event-types"
              },
              {
                "name": "Axiomatic Definition of Probability",
                "slug": "axiomatic-probability"
              },
              {
                "name": "Classical Definition — Equally Likely Outcomes",
                "slug": "classical-probability"
              },
              {
                "name": "Addition Theorem (P(A∪B) = P(A) + P(B) - P(A∩B))",
                "slug": "addition-theorem"
              },
              {
                "name": "Mutually Exclusive Events",
                "slug": "mutually-exclusive"
              },
              {
                "name": "Complement Rule (P(A') = 1 - P(A))",
                "slug": "complement-rule"
              },
              {
                "name": "Geometric Probability",
                "slug": "geometric-probability"
              }
            ]
          },
          {
            "name": "Relations and Functions",
            "slug": "relations-functions-12",
            "topics": [
              {
                "name": "Review — Types of Relations",
                "slug": "review-relations"
              },
              {
                "name": "Equivalence Relations and Classes",
                "slug": "equivalence-classes"
              },
              {
                "name": "One-One, Onto and Bijective Functions",
                "slug": "bijective-12"
              },
              {
                "name": "Composition of Functions and its Properties",
                "slug": "composition-12"
              },
              {
                "name": "Invertible Functions and Finding Inverse",
                "slug": "invertible-12"
              },
              {
                "name": "Binary Operations — Definition and Properties",
                "slug": "binary-operations"
              },
              {
                "name": "Commutativity, Associativity, Identity, Inverse",
                "slug": "binary-operation-properties"
              }
            ]
          },
          {
            "name": "Inverse Trigonometric Functions",
            "slug": "inverse-trig",
            "topics": [
              {
                "name": "Need for Restricted Domain",
                "slug": "restricted-domain"
              },
              {
                "name": "Domain and Range of sin⁻¹, cos⁻¹, tan⁻¹",
                "slug": "domain-range-main"
              },
              {
                "name": "Domain and Range of csc⁻¹, sec⁻¹, cot⁻¹",
                "slug": "domain-range-others"
              },
              {
                "name": "Graphs of Inverse Trig Functions",
                "slug": "graphs-inverse"
              },
              {
                "name": "Principal Value — Definition and Finding",
                "slug": "principal-value"
              },
              {
                "name": "Property — sin⁻¹(sinx) = x and sin(sin⁻¹x) = x",
                "slug": "inv-composition"
              },
              {
                "name": "Property — sin⁻¹x + cos⁻¹x = π/2",
                "slug": "complementary-inv"
              },
              {
                "name": "Property — tan⁻¹x + cot⁻¹x = π/2",
                "slug": "tan-cot-complementary"
              },
              {
                "name": "Addition Formula for tan⁻¹",
                "slug": "tan-addition"
              },
              {
                "name": "Double and Triple Angle Formulas in Inverse Trig",
                "slug": "double-triple-inv"
              }
            ]
          },
          {
            "name": "Matrices",
            "slug": "matrices",
            "topics": [
              {
                "name": "Matrix — Definition, Order and Types",
                "slug": "matrix-types"
              },
              {
                "name": "Matrix Equality",
                "slug": "matrix-equality"
              },
              {
                "name": "Addition and Subtraction of Matrices",
                "slug": "matrix-add-sub"
              },
              {
                "name": "Scalar Multiplication",
                "slug": "scalar-mult"
              },
              {
                "name": "Matrix Multiplication — Conditions and Rules",
                "slug": "matrix-multiplication"
              },
              {
                "name": "Properties of Matrix Multiplication",
                "slug": "mult-properties"
              },
              {
                "name": "Transpose of Matrix and Its Properties",
                "slug": "transpose"
              },
              {
                "name": "Symmetric and Skew-Symmetric Matrices",
                "slug": "symmetric-skew"
              },
              {
                "name": "Elementary Row Operations",
                "slug": "row-operations"
              },
              {
                "name": "Row Echelon Form",
                "slug": "row-echelon"
              }
            ]
          },
          {
            "name": "Determinants",
            "slug": "determinants",
            "topics": [
              {
                "name": "Determinant — Expansion along Row/Column (1×1, 2×2, 3×3)",
                "slug": "det-expansion"
              },
              {
                "name": "Properties of Determinants",
                "slug": "det-properties"
              },
              {
                "name": "Sarrus' Rule for 3×3 Determinant",
                "slug": "sarrus-rule"
              },
              {
                "name": "Minors and Cofactors",
                "slug": "minors-cofactors"
              },
              {
                "name": "Adjoint of a Matrix",
                "slug": "adjoint-matrix"
              },
              {
                "name": "Inverse of Matrix Using Adjoint (A⁻¹ = adj(A)/|A|)",
                "slug": "inverse-adjoint"
              },
              {
                "name": "Rank of a Matrix",
                "slug": "matrix-rank"
              },
              {
                "name": "System of Equations — Consistent and Inconsistent",
                "slug": "system-consistency"
              },
              {
                "name": "Cramer's Rule",
                "slug": "cramers-rule"
              },
              {
                "name": "Solving 3×3 System by Inverse Method",
                "slug": "inverse-method-system"
              }
            ]
          },
          {
            "name": "Continuity and Differentiability",
            "slug": "continuity-differentiability",
            "topics": [
              {
                "name": "Continuity at a Point — Definition",
                "slug": "continuity-def"
              },
              {
                "name": "Continuity from Left and Right",
                "slug": "continuity-left-right"
              },
              {
                "name": "Continuity of Common Functions",
                "slug": "continuity-common"
              },
              {
                "name": "Types of Discontinuities — Removable, Jump, Infinite",
                "slug": "discontinuity-types"
              },
              {
                "name": "Continuity on Closed Interval",
                "slug": "continuity-interval"
              },
              {
                "name": "Differentiability at a Point",
                "slug": "differentiability"
              },
              {
                "name": "Relation Between Continuity and Differentiability",
                "slug": "cont-diff-relation"
              },
              {
                "name": "Derivatives of Exponential Functions",
                "slug": "exp-derivatives"
              },
              {
                "name": "Derivatives of Logarithmic Functions",
                "slug": "log-derivatives"
              },
              {
                "name": "Derivatives of Inverse Trig Functions",
                "slug": "inv-trig-derivatives"
              }
            ]
          },
          {
            "name": "Application of Derivatives",
            "slug": "application-derivatives",
            "topics": [
              {
                "name": "Rate of Change of Quantities",
                "slug": "rate-of-change"
              },
              {
                "name": "Slope of Tangent and Normal",
                "slug": "slope-tangent-normal"
              },
              {
                "name": "Equation of Tangent",
                "slug": "equation-tangent"
              },
              {
                "name": "Equation of Normal",
                "slug": "equation-normal"
              },
              {
                "name": "Angle of Intersection of Two Curves",
                "slug": "angle-intersection-curves"
              },
              {
                "name": "Orthogonal Curves",
                "slug": "orthogonal-curves"
              },
              {
                "name": "Increasing and Decreasing Functions — Test",
                "slug": "increasing-decreasing"
              },
              {
                "name": "Monotonicity in Interval",
                "slug": "monotonicity"
              },
              {
                "name": "Critical Points",
                "slug": "critical-points"
              },
              {
                "name": "First Derivative Test for Extrema",
                "slug": "first-derivative-test"
              }
            ]
          },
          {
            "name": "Integrals",
            "slug": "integrals",
            "topics": [
              {
                "name": "Integration as Anti-Differentiation",
                "slug": "anti-diff"
              },
              {
                "name": "Standard Integrals — Power, Trig, Exp, Log",
                "slug": "standard-integrals"
              },
              {
                "name": "Integration by Substitution",
                "slug": "substitution"
              },
              {
                "name": "Integration of sin^m(x)·cos^n(x) forms",
                "slug": "sinm-cosn-forms"
              },
              {
                "name": "Integration Using Partial Fractions (All Cases)",
                "slug": "partial-fractions-all"
              },
              {
                "name": "Integration by Parts (ILATE)",
                "slug": "integration-by-parts"
              },
              {
                "name": "Special Integrals — ∫√(a²-x²)dx, ∫√(a²+x²)dx",
                "slug": "special-integrals"
              },
              {
                "name": "Integration of Rational Functions",
                "slug": "rational-integrals"
              },
              {
                "name": "Reduction Formulae",
                "slug": "reduction-formulae"
              },
              {
                "name": "Definite Integrals — Riemann Sum",
                "slug": "definite-riemann"
              }
            ]
          },
          {
            "name": "Application of Integrals",
            "slug": "application-integrals",
            "topics": [
              {
                "name": "Area Under Curve Using Definite Integral",
                "slug": "area-under-curve"
              },
              {
                "name": "Area Between Two Curves",
                "slug": "area-two-curves"
              },
              {
                "name": "Area Bounded by Parabola and Line",
                "slug": "area-parabola-line"
              },
              {
                "name": "Area Bounded by Circle",
                "slug": "area-circle"
              },
              {
                "name": "Area Using Horizontal and Vertical Strips",
                "slug": "horizontal-vertical-strips"
              }
            ]
          },
          {
            "name": "Differential Equations",
            "slug": "differential-equations",
            "topics": [
              {
                "name": "Ordinary Differential Equations — Order and Degree",
                "slug": "ode-order-degree"
              },
              {
                "name": "Formation of Differential Equation",
                "slug": "de-formation"
              },
              {
                "name": "Variable Separable Method",
                "slug": "variable-separable-de"
              },
              {
                "name": "Homogeneous Differential Equations",
                "slug": "homogeneous-de"
              },
              {
                "name": "Linear DE of First Order — dy/dx + Py = Q",
                "slug": "linear-de-first"
              },
              {
                "name": "Integrating Factor",
                "slug": "integrating-factor"
              },
              {
                "name": "Bernoulli's Equation",
                "slug": "bernoulli-de"
              },
              {
                "name": "Applications — Growth and Decay",
                "slug": "growth-decay"
              },
              {
                "name": "Applications — Newton's Law of Cooling",
                "slug": "cooling-de"
              },
              {
                "name": "Applications — Population Models",
                "slug": "population-de"
              }
            ]
          },
          {
            "name": "Vector Algebra",
            "slug": "vector-algebra",
            "topics": [
              {
                "name": "Vectors — Definition and Types",
                "slug": "vector-types"
              },
              {
                "name": "Addition of Vectors — Triangle and Parallelogram Law",
                "slug": "vector-addition-laws"
              },
              {
                "name": "Subtraction of Vectors",
                "slug": "vector-subtraction"
              },
              {
                "name": "Scalar Multiplication",
                "slug": "vector-scalar-mult"
              },
              {
                "name": "Position Vector",
                "slug": "position-vector"
              },
              {
                "name": "Components of Vector (i, j, k)",
                "slug": "vector-components"
              },
              {
                "name": "Magnitude of Vector",
                "slug": "vector-magnitude"
              },
              {
                "name": "Unit Vector",
                "slug": "unit-vector"
              },
              {
                "name": "Section Formula — Internal and External",
                "slug": "section-formula"
              },
              {
                "name": "Dot Product — Definition (a·b = |a||b|cosθ)",
                "slug": "dot-product-def"
              }
            ]
          },
          {
            "name": "Three Dimensional Geometry",
            "slug": "3d-geometry",
            "topics": [
              {
                "name": "Direction Cosines (l, m, n) and Properties",
                "slug": "direction-cosines"
              },
              {
                "name": "Direction Ratios and Conversion",
                "slug": "direction-ratios"
              },
              {
                "name": "Angle Between Two Lines using DC/DR",
                "slug": "angle-using-dc"
              },
              {
                "name": "Equation of Line — Vector Form",
                "slug": "line-vector"
              },
              {
                "name": "Equation of Line — Symmetric/Cartesian Form",
                "slug": "line-cartesian"
              },
              {
                "name": "Passing Through Two Points",
                "slug": "line-two-points"
              },
              {
                "name": "Angle Between Two Lines",
                "slug": "angle-two-lines-3d"
              },
              {
                "name": "Distance Between Point and Line",
                "slug": "point-line-3d"
              },
              {
                "name": "Skew Lines — Shortest Distance",
                "slug": "skew-shortest-distance"
              },
              {
                "name": "Distance Between Parallel Lines",
                "slug": "parallel-lines-3d"
              }
            ]
          },
          {
            "name": "Linear Programming",
            "slug": "linear-programming",
            "topics": [
              {
                "name": "LPP — Formulation from Word Problems",
                "slug": "lpp-formulation"
              },
              {
                "name": "Corner Point Method",
                "slug": "corner-point-method"
              },
              {
                "name": "Bounded and Unbounded Feasible Region",
                "slug": "feasible-region-types"
              },
              {
                "name": "Optimal Solution",
                "slug": "optimal-solution"
              },
              {
                "name": "Problems — Diet, Allocation, Transport",
                "slug": "lpp-problem-types"
              },
              {
                "name": "No Optimal Solution Case",
                "slug": "no-optimal-solution"
              }
            ]
          },
          {
            "name": "Probability",
            "slug": "probability-12",
            "topics": [
              {
                "name": "Conditional Probability — Definition and Formula",
                "slug": "conditional-prob"
              },
              {
                "name": "Properties of Conditional Probability",
                "slug": "conditional-properties"
              },
              {
                "name": "Multiplication Theorem (P(A∩B) = P(A)·P(B|A))",
                "slug": "multiplication-theorem"
              },
              {
                "name": "Independent Events — Condition",
                "slug": "independent-events"
              },
              {
                "name": "Total Probability Theorem",
                "slug": "total-probability"
              },
              {
                "name": "Bayes' Theorem",
                "slug": "bayes-theorem"
              },
              {
                "name": "Partition of Sample Space",
                "slug": "partition-sample-space"
              },
              {
                "name": "Random Variable — Discrete and Continuous",
                "slug": "random-variable"
              },
              {
                "name": "Probability Distribution Table",
                "slug": "prob-distribution-table"
              },
              {
                "name": "Mean (Expected Value) of RV",
                "slug": "mean-rv"
              }
            ]
          }
        ]
      }
    ]
  },
  "jee-advanced": {
    "name": "JEE Advanced",
    "subjects": [
      {
        "name": "Physics",
        "slug": "physics",
        "chapters": [
          {
            "name": "Physical World",
            "slug": "physical-world",
            "topics": [
              {
                "name": "Physics and Its Scope",
                "slug": "physics-scope"
              },
              {
                "name": "Fundamental Forces — Gravitational, Electromagnetic, Strong, Weak",
                "slug": "fundamental-forces"
              },
              {
                "name": "Nature of Physical Laws",
                "slug": "physical-laws"
              }
            ]
          },
          {
            "name": "Units and Measurements",
            "slug": "units-and-measurements",
            "topics": [
              {
                "name": "Physical Quantities — Fundamental and Derived",
                "slug": "fundamental-derived"
              },
              {
                "name": "SI Units and Their Definitions",
                "slug": "si-units"
              },
              {
                "name": "Dimensional Formula and Dimensional Equation",
                "slug": "dimensional-formula"
              },
              {
                "name": "Dimensional Analysis — Checking Consistency",
                "slug": "dimensional-consistency"
              },
              {
                "name": "Dimensional Analysis — Deriving Relations",
                "slug": "dimensional-deriving"
              },
              {
                "name": "Dimensional Analysis — Conversion of Units",
                "slug": "dimensional-conversion"
              },
              {
                "name": "Significant Figures and Rules",
                "slug": "significant-figures"
              },
              {
                "name": "Rounding Off Numbers",
                "slug": "rounding-off"
              },
              {
                "name": "Types of Errors — Systematic and Random",
                "slug": "error-types"
              },
              {
                "name": "Absolute, Relative and Percentage Error",
                "slug": "absolute-relative-error"
              }
            ]
          },
          {
            "name": "Motion in a Straight Line",
            "slug": "motion-straight-line",
            "topics": [
              {
                "name": "Position, Path Length and Displacement",
                "slug": "position-displacement"
              },
              {
                "name": "Average Velocity and Instantaneous Velocity",
                "slug": "velocity-types"
              },
              {
                "name": "Average Acceleration and Instantaneous Acceleration",
                "slug": "acceleration-types"
              },
              {
                "name": "Uniformly Accelerated Motion",
                "slug": "uniformly-accelerated"
              },
              {
                "name": "Kinematic Equations (v=u+at, s=ut+½at², v²=u²+2as)",
                "slug": "kinematic-equations"
              },
              {
                "name": "x-t, v-t and a-t Graphs — Analysis",
                "slug": "motion-graphs"
              },
              {
                "name": "Area under v-t Graph (Displacement)",
                "slug": "area-vt-graph"
              },
              {
                "name": "Free Fall and Motion Under Gravity",
                "slug": "free-fall"
              },
              {
                "name": "Reaction Time",
                "slug": "reaction-time"
              },
              {
                "name": "Relative Motion in 1D",
                "slug": "relative-motion-1d"
              }
            ]
          },
          {
            "name": "Motion in a Plane",
            "slug": "motion-plane",
            "topics": [
              {
                "name": "Scalars and Vectors — Definitions and Types",
                "slug": "scalars-vectors"
              },
              {
                "name": "Vector Addition — Triangle Law and Parallelogram Law",
                "slug": "vector-addition-laws"
              },
              {
                "name": "Resolution of Vectors into Components",
                "slug": "vector-resolution"
              },
              {
                "name": "Unit Vector and Position Vector",
                "slug": "unit-position-vector"
              },
              {
                "name": "Dot Product — Definition, Formula and Properties",
                "slug": "dot-product"
              },
              {
                "name": "Cross Product — Definition, Formula and Properties",
                "slug": "cross-product"
              },
              {
                "name": "Projectile Motion — Derivations (ToF, Range, Hmax)",
                "slug": "projectile-tof-range"
              },
              {
                "name": "Equation of Trajectory",
                "slug": "trajectory-equation"
              },
              {
                "name": "Projectile on Inclined Plane",
                "slug": "projectile-inclined"
              },
              {
                "name": "Uniform Circular Motion — Angular Quantities",
                "slug": "ucm-angular"
              }
            ]
          },
          {
            "name": "Laws of Motion",
            "slug": "laws-of-motion",
            "topics": [
              {
                "name": "Aristotle's Fallacy and Galileo's Law of Inertia",
                "slug": "aristotle-galileo"
              },
              {
                "name": "Newton's First Law — Inertia and Its Types",
                "slug": "first-law-inertia"
              },
              {
                "name": "Newton's Second Law — F = ma",
                "slug": "second-law-fma"
              },
              {
                "name": "Newton's Third Law and Action-Reaction Pairs",
                "slug": "third-law"
              },
              {
                "name": "Impulse and Impulsive Force",
                "slug": "impulse"
              },
              {
                "name": "Law of Conservation of Linear Momentum",
                "slug": "conservation-momentum"
              },
              {
                "name": "Free Body Diagram (FBD)",
                "slug": "fbd"
              },
              {
                "name": "Normal Force, Tension and Spring Force",
                "slug": "normal-tension-spring"
              },
              {
                "name": "Friction — Static, Kinetic and Rolling",
                "slug": "friction-types"
              },
              {
                "name": "Coefficient of Friction, Angle of Friction and Repose",
                "slug": "friction-coefficients"
              }
            ]
          },
          {
            "name": "Work, Energy and Power",
            "slug": "work-energy-power",
            "topics": [
              {
                "name": "Work Done by Constant and Variable Force",
                "slug": "work-constant-variable"
              },
              {
                "name": "Work-Energy Theorem",
                "slug": "work-energy-theorem"
              },
              {
                "name": "Kinetic Energy",
                "slug": "kinetic-energy"
              },
              {
                "name": "Gravitational Potential Energy",
                "slug": "gravitational-pe"
              },
              {
                "name": "Elastic Potential Energy in Spring (½kx²)",
                "slug": "spring-pe"
              },
              {
                "name": "Conservative and Non-Conservative Forces",
                "slug": "conservative-forces"
              },
              {
                "name": "Conservation of Mechanical Energy",
                "slug": "conservation-mech-energy"
              },
              {
                "name": "Power — Average and Instantaneous",
                "slug": "power-avg-inst"
              },
              {
                "name": "Collisions — Elastic and Inelastic in 1D",
                "slug": "elastic-inelastic-1d"
              },
              {
                "name": "Oblique Collisions (2D)",
                "slug": "oblique-collisions"
              }
            ]
          },
          {
            "name": "System of Particles and Rotational Motion",
            "slug": "rotational-motion",
            "topics": [
              {
                "name": "Centre of Mass — Discrete and Continuous Systems",
                "slug": "centre-of-mass"
              },
              {
                "name": "COM of Standard Bodies (Rod, Disc, Sphere, Cone, Triangle)",
                "slug": "com-standard-bodies"
              },
              {
                "name": "Motion of Centre of Mass",
                "slug": "com-motion"
              },
              {
                "name": "Angular Displacement, Velocity and Acceleration",
                "slug": "angular-kinematics"
              },
              {
                "name": "Equations of Rotational Motion",
                "slug": "rotational-equations"
              },
              {
                "name": "Torque — Definition and τ = Iα",
                "slug": "torque"
              },
              {
                "name": "Moment of Inertia — Definition and Physical Significance",
                "slug": "moi-definition"
              },
              {
                "name": "MI of Standard Bodies — Rod, Ring, Disc, Sphere, Cylinder",
                "slug": "moi-standard-bodies"
              },
              {
                "name": "Theorem of Parallel Axes",
                "slug": "parallel-axis-theorem"
              },
              {
                "name": "Theorem of Perpendicular Axes",
                "slug": "perpendicular-axis-theorem"
              }
            ]
          },
          {
            "name": "Gravitation",
            "slug": "gravitation",
            "topics": [
              {
                "name": "Kepler's Laws of Planetary Motion",
                "slug": "keplers-laws"
              },
              {
                "name": "Newton's Universal Law of Gravitation",
                "slug": "newtons-gravitation"
              },
              {
                "name": "Acceleration Due to Gravity (g) on Earth's Surface",
                "slug": "g-surface"
              },
              {
                "name": "Variation of g with Altitude",
                "slug": "g-altitude"
              },
              {
                "name": "Variation of g with Depth",
                "slug": "g-depth"
              },
              {
                "name": "Variation of g with Latitude and Rotation of Earth",
                "slug": "g-latitude-rotation"
              },
              {
                "name": "Gravitational Field Intensity",
                "slug": "gravitational-field"
              },
              {
                "name": "Gravitational Potential",
                "slug": "gravitational-potential"
              },
              {
                "name": "Gravitational Potential Energy",
                "slug": "gravitational-pe"
              },
              {
                "name": "Escape Velocity",
                "slug": "escape-velocity"
              }
            ]
          },
          {
            "name": "Mechanical Properties of Solids",
            "slug": "mechanical-properties-solids",
            "topics": [
              {
                "name": "Elasticity and Plasticity",
                "slug": "elasticity-plasticity"
              },
              {
                "name": "Types of Stress — Tensile, Compressive, Shear, Bulk",
                "slug": "stress-types"
              },
              {
                "name": "Types of Strain — Longitudinal, Shear, Volumetric",
                "slug": "strain-types"
              },
              {
                "name": "Stress-Strain Curve — Elastic Limit, Yield Point, UTS",
                "slug": "stress-strain-curve"
              },
              {
                "name": "Hooke's Law",
                "slug": "hookes-law"
              },
              {
                "name": "Young's Modulus — Definition and Numericals",
                "slug": "youngs-modulus"
              },
              {
                "name": "Bulk Modulus — Definition and Compressibility",
                "slug": "bulk-modulus"
              },
              {
                "name": "Shear Modulus (Modulus of Rigidity)",
                "slug": "shear-modulus"
              },
              {
                "name": "Poisson's Ratio",
                "slug": "poissons-ratio"
              },
              {
                "name": "Relations Among Elastic Constants",
                "slug": "elastic-constants-relation"
              }
            ]
          },
          {
            "name": "Mechanical Properties of Fluids",
            "slug": "mechanical-properties-fluids",
            "topics": [
              {
                "name": "Pressure — Thrust and Pressure in Fluid",
                "slug": "pressure-fluid"
              },
              {
                "name": "Pascal's Law and Its Applications",
                "slug": "pascals-law"
              },
              {
                "name": "Atmospheric Pressure — Gauge and Absolute",
                "slug": "atmospheric-gauge"
              },
              {
                "name": "Archimedes' Principle",
                "slug": "archimedes-principle"
              },
              {
                "name": "Buoyancy, Apparent Weight and Law of Floatation",
                "slug": "buoyancy-floatation"
              },
              {
                "name": "Equation of Continuity (A₁v₁ = A₂v₂)",
                "slug": "continuity-equation"
              },
              {
                "name": "Bernoulli's Theorem — Derivation and Applications",
                "slug": "bernoullis-theorem"
              },
              {
                "name": "Venturimeter and Pitot Tube",
                "slug": "venturimeter-pitot"
              },
              {
                "name": "Torricelli's Theorem and Speed of Efflux",
                "slug": "torricelli-efflux"
              },
              {
                "name": "Dynamic Lift — Magnus Effect, Aerofoil",
                "slug": "dynamic-lift"
              }
            ]
          },
          {
            "name": "Thermal Properties of Matter",
            "slug": "thermal-properties",
            "topics": [
              {
                "name": "Temperature Scales — Celsius, Kelvin, Fahrenheit",
                "slug": "temperature-scales"
              },
              {
                "name": "Thermal Expansion of Solids — α (Linear), β (Superficial), γ (Volumetric)",
                "slug": "expansion-solids"
              },
              {
                "name": "Thermal Expansion of Liquids — Absolute and Apparent",
                "slug": "expansion-liquids"
              },
              {
                "name": "Anomalous Expansion of Water",
                "slug": "anomalous-expansion"
              },
              {
                "name": "Thermal Expansion of Gases",
                "slug": "expansion-gases"
              },
              {
                "name": "Specific Heat Capacity and Heat Capacity",
                "slug": "specific-heat"
              },
              {
                "name": "Calorimetry — Principle and Numericals",
                "slug": "calorimetry"
              },
              {
                "name": "Latent Heat of Fusion and Vaporisation",
                "slug": "latent-heat"
              },
              {
                "name": "Heating and Cooling Curves",
                "slug": "heating-cooling-curve"
              },
              {
                "name": "Change of State — Melting, Boiling, Sublimation",
                "slug": "change-of-state"
              }
            ]
          },
          {
            "name": "Thermodynamics",
            "slug": "thermodynamics",
            "topics": [
              {
                "name": "Thermodynamic System — Types and State Variables",
                "slug": "system-state-variables"
              },
              {
                "name": "Zeroth Law and Thermal Equilibrium",
                "slug": "zeroth-law"
              },
              {
                "name": "Internal Energy",
                "slug": "internal-energy"
              },
              {
                "name": "First Law — ΔU = Q - W (Both Sign Conventions)",
                "slug": "first-law"
              },
              {
                "name": "Work Done by Gas — PV Diagram Analysis",
                "slug": "work-pv-diagram"
              },
              {
                "name": "Isothermal Process",
                "slug": "isothermal"
              },
              {
                "name": "Adiabatic Process — γ, Relations and Equations",
                "slug": "adiabatic"
              },
              {
                "name": "Isochoric Process",
                "slug": "isochoric"
              },
              {
                "name": "Isobaric Process",
                "slug": "isobaric"
              },
              {
                "name": "Polytropic Process",
                "slug": "polytropic"
              }
            ]
          },
          {
            "name": "Kinetic Theory",
            "slug": "kinetic-theory",
            "topics": [
              {
                "name": "Molecular Nature of Matter",
                "slug": "molecular-nature"
              },
              {
                "name": "Assumptions of Kinetic Theory of Gases",
                "slug": "kinetic-assumptions"
              },
              {
                "name": "Pressure Exerted by an Ideal Gas",
                "slug": "pressure-ideal-gas"
              },
              {
                "name": "Kinetic Interpretation of Temperature",
                "slug": "temperature-kinetic"
              },
              {
                "name": "RMS Speed (vrms)",
                "slug": "rms-speed"
              },
              {
                "name": "Mean Speed (v̄)",
                "slug": "mean-speed"
              },
              {
                "name": "Most Probable Speed (vp)",
                "slug": "most-probable-speed"
              },
              {
                "name": "Ratio of Speeds — vp : v̄ : vrms",
                "slug": "speed-ratios"
              },
              {
                "name": "Maxwell's Distribution of Speeds",
                "slug": "maxwell-distribution"
              },
              {
                "name": "Degrees of Freedom",
                "slug": "degrees-of-freedom"
              }
            ]
          },
          {
            "name": "Oscillations",
            "slug": "oscillations",
            "topics": [
              {
                "name": "Periodic and Oscillatory Motion",
                "slug": "periodic-oscillatory"
              },
              {
                "name": "SHM — Definition and Examples",
                "slug": "shm-definition"
              },
              {
                "name": "SHM — Differential Equation (d²x/dt² = -ω²x)",
                "slug": "shm-diff-equation"
              },
              {
                "name": "Displacement, Velocity and Acceleration in SHM",
                "slug": "shm-dva"
              },
              {
                "name": "Phase — Initial Phase and Phase Difference",
                "slug": "shm-phase"
              },
              {
                "name": "KE and PE in SHM",
                "slug": "ke-pe-shm"
              },
              {
                "name": "Total Energy in SHM (E = ½mω²A²)",
                "slug": "total-energy-shm"
              },
              {
                "name": "Spring-Mass System — T = 2π√(m/k)",
                "slug": "spring-mass-system"
              },
              {
                "name": "Springs in Series and Parallel",
                "slug": "springs-combinations"
              },
              {
                "name": "Simple Pendulum — T = 2π√(L/g)",
                "slug": "simple-pendulum"
              }
            ]
          },
          {
            "name": "Waves",
            "slug": "waves",
            "topics": [
              {
                "name": "Transverse and Longitudinal Waves",
                "slug": "transverse-longitudinal"
              },
              {
                "name": "Wave Parameters — Amplitude, Wavelength, Frequency, Period",
                "slug": "wave-parameters"
              },
              {
                "name": "Wave Equation — y = A sin(kx - ωt)",
                "slug": "wave-equation"
              },
              {
                "name": "Speed of Transverse Wave in String (v = √T/μ)",
                "slug": "speed-string"
              },
              {
                "name": "Speed of Longitudinal Wave in Medium",
                "slug": "speed-longitudinal"
              },
              {
                "name": "Speed of Sound — Newton and Laplace Formula",
                "slug": "speed-sound"
              },
              {
                "name": "Intensity of Wave (I ∝ A²)",
                "slug": "wave-intensity"
              },
              {
                "name": "Principle of Superposition of Waves",
                "slug": "superposition"
              },
              {
                "name": "Reflection at Fixed End (Phase Change) and Free End",
                "slug": "wave-reflection"
              },
              {
                "name": "Standing Waves — Condition and Formation",
                "slug": "standing-waves"
              }
            ]
          },
          {
            "name": "Electric Charges and Fields",
            "slug": "electric-charges-fields",
            "topics": [
              {
                "name": "Electric Charge — Properties and Conservation",
                "slug": "charge-properties"
              },
              {
                "name": "Conductors, Insulators and Semiconductors",
                "slug": "conductors-insulators"
              },
              {
                "name": "Methods of Charging — Friction, Conduction, Induction",
                "slug": "charging-methods"
              },
              {
                "name": "Coulomb's Law in Free Space and Medium",
                "slug": "coulombs-law"
              },
              {
                "name": "Superposition Principle for Multiple Charges",
                "slug": "superposition-principle"
              },
              {
                "name": "Electric Field — Definition and Formula",
                "slug": "electric-field-def"
              },
              {
                "name": "Electric Field due to Point Charge",
                "slug": "field-point-charge"
              },
              {
                "name": "Electric Field Lines — Properties",
                "slug": "field-lines"
              },
              {
                "name": "Electric Dipole — Definition and Dipole Moment",
                "slug": "electric-dipole"
              },
              {
                "name": "Field on Axial Line of Dipole",
                "slug": "field-axial-dipole"
              }
            ]
          },
          {
            "name": "Electrostatic Potential and Capacitance",
            "slug": "electrostatic-potential-capacitance",
            "topics": [
              {
                "name": "Electric Potential — Definition, Unit and Formula",
                "slug": "potential-definition"
              },
              {
                "name": "Relation Between E and V (E = -dV/dr)",
                "slug": "e-v-relation"
              },
              {
                "name": "Potential due to Point Charge",
                "slug": "potential-point"
              },
              {
                "name": "Potential due to Electric Dipole — Axial and Equatorial",
                "slug": "potential-dipole"
              },
              {
                "name": "Potential due to System of Charges",
                "slug": "potential-system"
              },
              {
                "name": "Equipotential Surfaces — Properties and Examples",
                "slug": "equipotential-surfaces"
              },
              {
                "name": "Potential Energy of System of Charges",
                "slug": "pe-system-charges"
              },
              {
                "name": "Potential Energy of Dipole in External Field",
                "slug": "pe-dipole-field"
              },
              {
                "name": "Conductors in Electrostatic Equilibrium",
                "slug": "conductors-equilibrium"
              },
              {
                "name": "Dielectrics — Polar and Non-Polar",
                "slug": "dielectrics-types"
              }
            ]
          },
          {
            "name": "Current Electricity",
            "slug": "current-electricity",
            "topics": [
              {
                "name": "Electric Current and Conventional Current",
                "slug": "electric-current"
              },
              {
                "name": "Drift Velocity and Mobility",
                "slug": "drift-velocity-mobility"
              },
              {
                "name": "Relation Between Current and Drift Velocity",
                "slug": "current-drift-relation"
              },
              {
                "name": "Ohm's Law — Statement and Limitations",
                "slug": "ohms-law"
              },
              {
                "name": "Resistance — Definition, Resistivity and Conductivity",
                "slug": "resistance-resistivity"
              },
              {
                "name": "Variation of Resistance with Temperature — α",
                "slug": "resistance-temperature"
              },
              {
                "name": "Colour Code for Resistors",
                "slug": "colour-code"
              },
              {
                "name": "Resistors in Series",
                "slug": "resistors-series"
              },
              {
                "name": "Resistors in Parallel",
                "slug": "resistors-parallel"
              },
              {
                "name": "Kirchhoff's Current Law (KCL / Junction Rule)",
                "slug": "kcl"
              }
            ]
          },
          {
            "name": "Moving Charges and Magnetism",
            "slug": "moving-charges-magnetism",
            "topics": [
              {
                "name": "Magnetic Field — Concept, Biot-Savart Law",
                "slug": "biot-savart-law"
              },
              {
                "name": "Magnetic Field due to Straight Finite and Infinite Wire",
                "slug": "field-wire"
              },
              {
                "name": "Magnetic Field on Axis of Circular Current Loop",
                "slug": "field-circular-loop"
              },
              {
                "name": "Ampere's Circuital Law",
                "slug": "amperes-law"
              },
              {
                "name": "Magnetic Field Inside Solenoid",
                "slug": "field-solenoid"
              },
              {
                "name": "Magnetic Field of Toroid",
                "slug": "field-toroid"
              },
              {
                "name": "Force on Moving Charge in Magnetic Field (F = qv × B)",
                "slug": "force-charge"
              },
              {
                "name": "Motion of Charged Particle — Circle, Helix",
                "slug": "particle-motion"
              },
              {
                "name": "Cyclotron — Principle, Working and Limitations",
                "slug": "cyclotron"
              },
              {
                "name": "Force on Current-Carrying Conductor in B",
                "slug": "force-conductor"
              }
            ]
          },
          {
            "name": "Magnetism and Matter",
            "slug": "magnetism-matter",
            "topics": [
              {
                "name": "Bar Magnet — Properties and Pole Strength",
                "slug": "bar-magnet"
              },
              {
                "name": "Axial Field of Bar Magnet",
                "slug": "magnet-axial-field"
              },
              {
                "name": "Equatorial Field of Bar Magnet",
                "slug": "magnet-equatorial-field"
              },
              {
                "name": "Torque on Magnetic Dipole in Uniform B",
                "slug": "magnet-torque"
              },
              {
                "name": "Potential Energy of Dipole in B",
                "slug": "dipole-pe"
              },
              {
                "name": "Gauss's Law for Magnetism",
                "slug": "gauss-magnetism"
              },
              {
                "name": "Bar Magnet as Equivalent Solenoid",
                "slug": "magnet-solenoid-equiv"
              },
              {
                "name": "Earth's Magnetic Field — Components (BH, BV, δ, I)",
                "slug": "earth-field-components"
              },
              {
                "name": "Magnetic Properties — I, H, χ, μ",
                "slug": "magnetic-properties"
              },
              {
                "name": "Diamagnetic Materials",
                "slug": "diamagnetic"
              }
            ]
          },
          {
            "name": "Electromagnetic Induction",
            "slug": "em-induction",
            "topics": [
              {
                "name": "Magnetic Flux (Φ = B·A cosθ)",
                "slug": "magnetic-flux"
              },
              {
                "name": "Faraday's First and Second Laws of Induction",
                "slug": "faradays-laws"
              },
              {
                "name": "Lenz's Law and Conservation of Energy",
                "slug": "lenzs-law"
              },
              {
                "name": "Motional EMF (ε = Bvl)",
                "slug": "motional-emf"
              },
              {
                "name": "EMF in Rotating Coil",
                "slug": "rotating-coil-emf"
              },
              {
                "name": "Eddy Currents — Causes, Effects and Uses",
                "slug": "eddy-currents"
              },
              {
                "name": "Self-Inductance (L) and Self-Induced EMF",
                "slug": "self-inductance"
              },
              {
                "name": "Self-Inductance of Solenoid (L = μ₀n²V)",
                "slug": "self-inductance-solenoid"
              },
              {
                "name": "Mutual Inductance (M) and Mutually Induced EMF",
                "slug": "mutual-inductance"
              },
              {
                "name": "Coefficient of Coupling",
                "slug": "coupling-coefficient"
              }
            ]
          },
          {
            "name": "Alternating Current",
            "slug": "alternating-current",
            "topics": [
              {
                "name": "AC Voltage — Amplitude, Angular Frequency, Phase",
                "slug": "ac-basics"
              },
              {
                "name": "Peak, RMS and Average Value",
                "slug": "ac-peak-rms-avg"
              },
              {
                "name": "AC through Pure Resistor",
                "slug": "ac-resistor"
              },
              {
                "name": "AC through Pure Inductor — Inductive Reactance (XL)",
                "slug": "ac-inductor"
              },
              {
                "name": "AC through Pure Capacitor — Capacitive Reactance (XC)",
                "slug": "ac-capacitor"
              },
              {
                "name": "Phasor Diagram — LR, RC and LC Circuits",
                "slug": "phasor-diagrams"
              },
              {
                "name": "Series RLC Circuit — Impedance Z",
                "slug": "series-rlc-impedance"
              },
              {
                "name": "Resonance in Series RLC — f₀ = 1/(2π√LC)",
                "slug": "series-resonance"
              },
              {
                "name": "Bandwidth and Quality Factor (Q)",
                "slug": "bandwidth-q-factor"
              },
              {
                "name": "Power in AC — Apparent, Real and Reactive Power",
                "slug": "power-ac-types"
              }
            ]
          },
          {
            "name": "Electromagnetic Waves",
            "slug": "em-waves",
            "topics": [
              {
                "name": "Need for Displacement Current — Limitation of Ampere's Law",
                "slug": "displacement-current-need"
              },
              {
                "name": "Displacement Current (Id = ε₀ dΦE/dt)",
                "slug": "displacement-current"
              },
              {
                "name": "Maxwell's Equations (Qualitative)",
                "slug": "maxwells-equations"
              },
              {
                "name": "EM Wave — Transverse Nature and Properties",
                "slug": "em-wave-properties"
              },
              {
                "name": "Speed of EM Waves (c = 1/√μ₀ε₀)",
                "slug": "em-wave-speed"
              },
              {
                "name": "Energy, Intensity and Momentum of EM Waves",
                "slug": "em-energy-momentum"
              },
              {
                "name": "EM Spectrum — Gamma, X-ray, UV, Visible, IR, Microwave, Radio",
                "slug": "em-spectrum-regions"
              },
              {
                "name": "Wavelength Range and Applications of Each Region",
                "slug": "em-spectrum-applications"
              }
            ]
          },
          {
            "name": "Ray Optics and Optical Instruments",
            "slug": "ray-optics",
            "topics": [
              {
                "name": "Reflection at Plane Mirror — Image Properties",
                "slug": "plane-mirror-image"
              },
              {
                "name": "Reflection at Spherical Mirror — Sign Convention",
                "slug": "spherical-mirror-convention"
              },
              {
                "name": "Mirror Formula (1/v + 1/u = 1/f)",
                "slug": "mirror-formula"
              },
              {
                "name": "Magnification by Spherical Mirror",
                "slug": "mirror-magnification"
              },
              {
                "name": "Refraction — Snell's Law",
                "slug": "snells-law"
              },
              {
                "name": "Refractive Index — Absolute and Relative",
                "slug": "refractive-index"
              },
              {
                "name": "Total Internal Reflection and Critical Angle",
                "slug": "tir-critical-angle"
              },
              {
                "name": "Applications of TIR — Optical Fibre, Diamond, Mirage",
                "slug": "tir-applications"
              },
              {
                "name": "Refraction at Spherical Surfaces",
                "slug": "refraction-spherical"
              },
              {
                "name": "Thin Lens Formula (1/v - 1/u = 1/f)",
                "slug": "thin-lens-formula"
              }
            ]
          },
          {
            "name": "Wave Optics",
            "slug": "wave-optics",
            "topics": [
              {
                "name": "Huygens' Principle",
                "slug": "huygens-principle"
              },
              {
                "name": "Coherent Sources",
                "slug": "coherent-sources"
              },
              {
                "name": "Young's Double Slit Experiment (YDSE) — Setup",
                "slug": "ydse-setup"
              },
              {
                "name": "Fringe Width β = λD/d",
                "slug": "fringe-width"
              },
              {
                "name": "Conditions for Bright and Dark Fringes",
                "slug": "bright-dark-fringes"
              },
              {
                "name": "Intensity Distribution in YDSE",
                "slug": "ydse-intensity"
              },
              {
                "name": "Effect of Thin Film in YDSE Path",
                "slug": "ydse-thin-film"
              },
              {
                "name": "Diffraction at Single Slit",
                "slug": "single-slit-diffraction"
              },
              {
                "name": "Width of Central Maximum (2λD/d)",
                "slug": "central-max-width"
              },
              {
                "name": "Resolving Power of Microscope and Telescope",
                "slug": "resolving-power"
              }
            ]
          },
          {
            "name": "Dual Nature of Radiation and Matter",
            "slug": "dual-nature",
            "topics": [
              {
                "name": "Photoelectric Effect — Discovery and Observations",
                "slug": "pe-discovery"
              },
              {
                "name": "Effect of Intensity, Frequency and Potential",
                "slug": "pe-effects"
              },
              {
                "name": "Failure of Classical Wave Theory",
                "slug": "wave-theory-failure"
              },
              {
                "name": "Einstein's Photoelectric Equation (Kmax = hν - φ)",
                "slug": "einsteins-equation"
              },
              {
                "name": "Work Function and Threshold Frequency",
                "slug": "work-function"
              },
              {
                "name": "Stopping Potential and Its Significance",
                "slug": "stopping-potential"
              },
              {
                "name": "de Broglie's Hypothesis (λ = h/mv)",
                "slug": "de-broglie-hypothesis"
              },
              {
                "name": "de Broglie Wavelength of Electron (λ = h/√2mK)",
                "slug": "de-broglie-electron"
              },
              {
                "name": "Davisson-Germer Experiment",
                "slug": "davisson-germer"
              },
              {
                "name": "Heisenberg's Uncertainty Principle (Δx·Δp ≥ h/4π)",
                "slug": "uncertainty-principle"
              }
            ]
          },
          {
            "name": "Atoms",
            "slug": "atoms",
            "topics": [
              {
                "name": "Thomson's Model and Its Failure",
                "slug": "thomson-model"
              },
              {
                "name": "Rutherford's α-Scattering Experiment",
                "slug": "alpha-scattering"
              },
              {
                "name": "Rutherford's Nuclear Model and Limitations",
                "slug": "rutherford-model"
              },
              {
                "name": "Bohr's Postulates",
                "slug": "bohr-postulates"
              },
              {
                "name": "Bohr's Radii (rn = n²a₀)",
                "slug": "bohr-radii"
              },
              {
                "name": "Bohr's Velocities (vn = v₀/n)",
                "slug": "bohr-velocities"
              },
              {
                "name": "Bohr's Energy Levels (En = -13.6/n² eV)",
                "slug": "bohr-energy-levels"
              },
              {
                "name": "Emission and Absorption Spectra",
                "slug": "emission-absorption"
              },
              {
                "name": "Hydrogen Spectral Series — Lyman, Balmer, Paschen, Brackett, Pfund",
                "slug": "spectral-series"
              },
              {
                "name": "Excitation Energy and Ionisation Energy",
                "slug": "excitation-ionisation"
              }
            ]
          },
          {
            "name": "Nuclei",
            "slug": "nuclei",
            "topics": [
              {
                "name": "Composition of Nucleus — Protons and Neutrons",
                "slug": "nucleus-composition"
              },
              {
                "name": "Atomic Mass Unit (amu) and Energy Equivalent",
                "slug": "amu-energy"
              },
              {
                "name": "Nuclear Size — R = R₀A^(1/3)",
                "slug": "nuclear-size"
              },
              {
                "name": "Nuclear Density",
                "slug": "nuclear-density"
              },
              {
                "name": "Mass Defect (Δm)",
                "slug": "mass-defect"
              },
              {
                "name": "Binding Energy (ΔmC²)",
                "slug": "binding-energy"
              },
              {
                "name": "Binding Energy per Nucleon — Graph and Significance",
                "slug": "be-nucleon-graph"
              },
              {
                "name": "Radioactivity — Discovery and Properties",
                "slug": "radioactivity"
              },
              {
                "name": "Alpha Decay — Equation and Q-Value",
                "slug": "alpha-decay"
              },
              {
                "name": "Beta Decay (β⁻ and β⁺) — Neutrino",
                "slug": "beta-decay"
              }
            ]
          },
          {
            "name": "Semiconductor Electronics: Materials, Devices and Simple Circuits",
            "slug": "semiconductor-electronics",
            "topics": [
              {
                "name": "Energy Bands — Valence, Conduction, Band Gap",
                "slug": "energy-bands"
              },
              {
                "name": "Classification — Metals, Semiconductors, Insulators",
                "slug": "band-classification"
              },
              {
                "name": "Intrinsic Semiconductor — Electron-Hole Pair",
                "slug": "intrinsic-semiconductor"
              },
              {
                "name": "Extrinsic — n-Type Semiconductor (Donor Impurity)",
                "slug": "n-type"
              },
              {
                "name": "Extrinsic — p-Type Semiconductor (Acceptor Impurity)",
                "slug": "p-type"
              },
              {
                "name": "p-n Junction Formation and Depletion Layer",
                "slug": "pn-junction"
              },
              {
                "name": "Potential Barrier",
                "slug": "potential-barrier"
              },
              {
                "name": "Forward Bias and Reverse Bias",
                "slug": "forward-reverse-bias"
              },
              {
                "name": "I-V Characteristics of p-n Junction Diode",
                "slug": "diode-iv-char"
              },
              {
                "name": "Half-Wave Rectifier",
                "slug": "half-wave-rectifier"
              }
            ]
          }
        ]
      },
      {
        "name": "Chemistry",
        "slug": "chemistry",
        "chapters": [
          {
            "name": "Some Basic Concepts of Chemistry",
            "slug": "basic-concepts",
            "topics": [
              {
                "name": "Importance and Nature of Chemistry",
                "slug": "importance-chemistry"
              },
              {
                "name": "Laws of Chemical Combination",
                "slug": "laws-combination"
              },
              {
                "name": "Dalton's Atomic Theory",
                "slug": "daltons-theory"
              },
              {
                "name": "Atomic Mass and Molecular Mass",
                "slug": "atomic-molecular-mass"
              },
              {
                "name": "Mole Concept and Avogadro's Number",
                "slug": "mole-avogadro"
              },
              {
                "name": "Molar Mass",
                "slug": "molar-mass"
              },
              {
                "name": "Percentage Composition",
                "slug": "percentage-composition"
              },
              {
                "name": "Empirical Formula from Percentage Composition",
                "slug": "empirical-from-percent"
              },
              {
                "name": "Molecular Formula from Empirical Formula",
                "slug": "molecular-from-empirical"
              },
              {
                "name": "Stoichiometry and Mole-Mole Relationship",
                "slug": "stoichiometry"
              }
            ]
          },
          {
            "name": "Structure of Atom",
            "slug": "structure-of-atom",
            "topics": [
              {
                "name": "Discovery of Electron — Cathode Ray Experiment",
                "slug": "discovery-electron"
              },
              {
                "name": "Charge-to-Mass Ratio of Electron",
                "slug": "e-m-ratio"
              },
              {
                "name": "Millikan's Oil Drop Experiment — Charge of Electron",
                "slug": "millikan-experiment"
              },
              {
                "name": "Discovery of Proton and Neutron",
                "slug": "proton-neutron"
              },
              {
                "name": "Thomson's Plum Pudding Model",
                "slug": "thomson-model-chem"
              },
              {
                "name": "Rutherford's α-Scattering and Nuclear Model",
                "slug": "rutherford-chem"
              },
              {
                "name": "Atomic Number, Mass Number, Isotopes and Isobars",
                "slug": "atomic-number-isotopes"
              },
              {
                "name": "Electromagnetic Radiation — Wave Nature",
                "slug": "em-radiation-wave"
              },
              {
                "name": "Planck's Quantum Theory and Energy of Photon",
                "slug": "planck-theory"
              },
              {
                "name": "Photoelectric Effect",
                "slug": "photoelectric-chem"
              }
            ]
          },
          {
            "name": "Classification of Elements and Periodicity in Properties",
            "slug": "periodic-table",
            "topics": [
              {
                "name": "History — Döbereiner's Triads, Newlands' Law of Octaves",
                "slug": "history-triads-octaves"
              },
              {
                "name": "Mendeleev's Periodic Table and Its Limitations",
                "slug": "mendeleev-table"
              },
              {
                "name": "Modern Periodic Law and Long Form of Table",
                "slug": "modern-table"
              },
              {
                "name": "s, p, d, f Block Classification",
                "slug": "block-classification"
              },
              {
                "name": "Atomic Radius — Covalent, Metallic, Van der Waals",
                "slug": "atomic-radius-types"
              },
              {
                "name": "Trend of Atomic Radius in Period (Decreases)",
                "slug": "atomic-radius-period"
              },
              {
                "name": "Trend of Atomic Radius in Group (Increases)",
                "slug": "atomic-radius-group"
              },
              {
                "name": "Ionic Radius and Isoelectronic Species",
                "slug": "ionic-radius"
              },
              {
                "name": "Ionisation Enthalpy — Definition",
                "slug": "ie-def"
              },
              {
                "name": "Trends of IE in Period and Group",
                "slug": "ie-trends"
              }
            ]
          },
          {
            "name": "Chemical Bonding and Molecular Structure",
            "slug": "chemical-bonding",
            "topics": [
              {
                "name": "Kossel-Lewis Approach — Octet Rule",
                "slug": "octet-rule"
              },
              {
                "name": "Lewis Dot Structures",
                "slug": "lewis-dot"
              },
              {
                "name": "Exceptions to Octet Rule",
                "slug": "octet-exceptions"
              },
              {
                "name": "Formal Charge Calculation",
                "slug": "formal-charge"
              },
              {
                "name": "Ionic Bond — Formation and Conditions",
                "slug": "ionic-bond"
              },
              {
                "name": "Lattice Enthalpy and Born-Haber Cycle",
                "slug": "lattice-born-haber"
              },
              {
                "name": "Covalent Bond — σ and π Bonds",
                "slug": "sigma-pi-bonds"
              },
              {
                "name": "Bond Parameters — Length, Energy, Angle, Order",
                "slug": "bond-parameters"
              },
              {
                "name": "Polar Covalent Bond and Dipole Moment",
                "slug": "polar-dipole"
              },
              {
                "name": "Resonance Structures and Resonance Energy",
                "slug": "resonance"
              }
            ]
          },
          {
            "name": "States of Matter",
            "slug": "states-of-matter",
            "topics": [
              {
                "name": "Intermolecular Forces and Effect on State",
                "slug": "intermolecular-forces"
              },
              {
                "name": "Boyle's Law",
                "slug": "boyles-law"
              },
              {
                "name": "Charles's Law",
                "slug": "charless-law"
              },
              {
                "name": "Gay-Lussac's Law",
                "slug": "gay-lussac-law"
              },
              {
                "name": "Avogadro's Law and Molar Volume at STP",
                "slug": "avogadros-law"
              },
              {
                "name": "Ideal Gas Equation (PV = nRT)",
                "slug": "ideal-gas-eq"
              },
              {
                "name": "Dalton's Law of Partial Pressure",
                "slug": "daltons-partial-pressure"
              },
              {
                "name": "Kinetic Molecular Theory of Gases",
                "slug": "kmt"
              },
              {
                "name": "Molecular Speed Distribution — Maxwell",
                "slug": "maxwell-speed"
              },
              {
                "name": "RMS, Mean and Most Probable Speed",
                "slug": "speed-types"
              }
            ]
          },
          {
            "name": "Thermodynamics",
            "slug": "thermodynamics-chem",
            "topics": [
              {
                "name": "System, Surroundings — Open, Closed, Isolated",
                "slug": "system-types"
              },
              {
                "name": "Thermodynamic State Functions",
                "slug": "state-functions"
              },
              {
                "name": "Extensive and Intensive Properties",
                "slug": "extensive-intensive"
              },
              {
                "name": "Isothermal, Adiabatic, Isochoric, Isobaric Processes",
                "slug": "thermo-processes"
              },
              {
                "name": "Heat (q) and Work (w) — Sign Conventions",
                "slug": "heat-work-signs"
              },
              {
                "name": "First Law — ΔU = q + w",
                "slug": "first-law-chem"
              },
              {
                "name": "Enthalpy (H = U + pV)",
                "slug": "enthalpy"
              },
              {
                "name": "ΔH = ΔU + ΔngRT",
                "slug": "dh-du-relation"
              },
              {
                "name": "Standard Enthalpy of Formation (ΔfH°)",
                "slug": "standard-formation"
              },
              {
                "name": "Hess's Law of Constant Heat Summation",
                "slug": "hesss-law"
              }
            ]
          },
          {
            "name": "Equilibrium",
            "slug": "equilibrium",
            "topics": [
              {
                "name": "Physical and Chemical Equilibrium",
                "slug": "physical-chemical-eq"
              },
              {
                "name": "Law of Mass Action",
                "slug": "law-mass-action"
              },
              {
                "name": "Kc — Expression and Units",
                "slug": "kc-expression"
              },
              {
                "name": "Kp — Expression and Units",
                "slug": "kp-expression"
              },
              {
                "name": "Relation Between Kc and Kp (Kp = Kc(RT)^Δn)",
                "slug": "kc-kp-relation"
              },
              {
                "name": "Homogeneous and Heterogeneous Equilibrium",
                "slug": "homo-heterogeneous-eq"
              },
              {
                "name": "Characteristics of Equilibrium Constant",
                "slug": "k-characteristics"
              },
              {
                "name": "Reaction Quotient (Qc) and Direction of Reaction",
                "slug": "reaction-quotient"
              },
              {
                "name": "Le Chatelier's Principle",
                "slug": "le-chateliers"
              },
              {
                "name": "Effect of Concentration, Pressure, Temperature on K",
                "slug": "equilibrium-effects"
              }
            ]
          },
          {
            "name": "Redox Reactions",
            "slug": "redox-reactions",
            "topics": [
              {
                "name": "Oxidation and Reduction — Electronic Concept",
                "slug": "oxidation-reduction-def"
              },
              {
                "name": "Oxidation Number — Rules and Calculation",
                "slug": "oxidation-number-rules"
              },
              {
                "name": "Oxidising and Reducing Agents",
                "slug": "oxidising-reducing"
              },
              {
                "name": "Balancing by Oxidation Number Method",
                "slug": "ox-number-balancing"
              },
              {
                "name": "Half-Reaction Method — Acidic Medium",
                "slug": "half-reaction-acidic"
              },
              {
                "name": "Half-Reaction Method — Basic Medium",
                "slug": "half-reaction-basic"
              },
              {
                "name": "Types — Combination, Decomposition, Displacement, Disproportionation",
                "slug": "redox-types"
              },
              {
                "name": "Electrochemical Series and Standard Reduction Potential",
                "slug": "electrochemical-series"
              }
            ]
          },
          {
            "name": "Hydrogen",
            "slug": "hydrogen",
            "topics": [
              {
                "name": "Position of Hydrogen — Unique Character",
                "slug": "hydrogen-unique"
              },
              {
                "name": "Isotopes — Protium, Deuterium (D₂O), Tritium",
                "slug": "hydrogen-isotopes"
              },
              {
                "name": "Preparation of Hydrogen — Laboratory Methods",
                "slug": "hydrogen-lab-prep"
              },
              {
                "name": "Industrial Preparation — Steam Reforming",
                "slug": "hydrogen-industrial"
              },
              {
                "name": "Properties of Molecular Hydrogen",
                "slug": "hydrogen-properties"
              },
              {
                "name": "Hydrides — Ionic, Covalent, Metallic",
                "slug": "hydrides-types"
              },
              {
                "name": "Water — Structure and Unique Properties",
                "slug": "water-structure"
              },
              {
                "name": "Anomalous Expansion of Water",
                "slug": "water-anomalous"
              },
              {
                "name": "Hard Water — Temporary and Permanent",
                "slug": "hard-water"
              },
              {
                "name": "Removal of Hardness",
                "slug": "hardness-removal"
              }
            ]
          },
          {
            "name": "The s-Block Elements",
            "slug": "s-block",
            "topics": [
              {
                "name": "General Characteristics — Electronic Configuration, Properties",
                "slug": "s-block-general"
              },
              {
                "name": "Alkali Metals — Physical Properties and Trends",
                "slug": "alkali-physical"
              },
              {
                "name": "Alkali Metals — Chemical Properties",
                "slug": "alkali-chemical"
              },
              {
                "name": "Anomalous Behaviour of Lithium",
                "slug": "li-anomalous"
              },
              {
                "name": "Diagonal Relationship — Li and Mg",
                "slug": "li-mg-diagonal"
              },
              {
                "name": "NaOH — Preparation (Castner-Kellner) and Properties",
                "slug": "naoh"
              },
              {
                "name": "Na₂CO₃ — Solvay Process and Properties",
                "slug": "na2co3"
              },
              {
                "name": "NaHCO₃ and NaCl",
                "slug": "nahco3-nacl"
              },
              {
                "name": "Alkaline Earth Metals — Physical Properties",
                "slug": "ae-physical"
              },
              {
                "name": "Alkaline Earth Metals — Chemical Properties",
                "slug": "ae-chemical"
              }
            ]
          },
          {
            "name": "The p-Block Elements (Groups 13 and 14)",
            "slug": "p-block-11",
            "topics": [
              {
                "name": "Group 13 — General Properties and Trends",
                "slug": "group13-general"
              },
              {
                "name": "Boron — Allotropes, Structure and Properties",
                "slug": "boron-properties"
              },
              {
                "name": "Borax (Na₂B₄O₇) — Structure and Reactions",
                "slug": "borax"
              },
              {
                "name": "Boric Acid — Structure and Reactions",
                "slug": "boric-acid"
              },
              {
                "name": "Diborane — Structure and Preparation",
                "slug": "diborane"
              },
              {
                "name": "Aluminium — Properties and Reactions",
                "slug": "aluminium"
              },
              {
                "name": "Alums",
                "slug": "alums"
              },
              {
                "name": "Group 14 — General Properties and Trends",
                "slug": "group14-general"
              },
              {
                "name": "Catenation and Allotropy of Carbon",
                "slug": "catenation-allotropy"
              },
              {
                "name": "Diamond — Structure and Properties",
                "slug": "diamond"
              }
            ]
          },
          {
            "name": "Organic Chemistry: Some Basic Principles and Techniques",
            "slug": "organic-basics",
            "topics": [
              {
                "name": "Tetravalency of Carbon — Catenation",
                "slug": "tetravalency"
              },
              {
                "name": "Classification — Acyclic, Cyclic, Aromatic, Heterocyclic",
                "slug": "classification-organic"
              },
              {
                "name": "Functional Groups",
                "slug": "functional-groups"
              },
              {
                "name": "IUPAC Nomenclature — Alkanes",
                "slug": "iupac-alkanes"
              },
              {
                "name": "IUPAC Nomenclature — Alkenes and Alkynes",
                "slug": "iupac-alkenes-alkynes"
              },
              {
                "name": "IUPAC Nomenclature — Functional Group Compounds",
                "slug": "iupac-functional-groups"
              },
              {
                "name": "Chain, Position and Functional Group Isomerism",
                "slug": "structural-isomerism-types"
              },
              {
                "name": "Optical Isomerism — Chirality and Enantiomers",
                "slug": "optical-isomerism"
              },
              {
                "name": "R and S Configuration",
                "slug": "r-s-configuration"
              },
              {
                "name": "Geometrical Isomerism — cis-trans",
                "slug": "cis-trans-isomerism"
              }
            ]
          },
          {
            "name": "Hydrocarbons",
            "slug": "hydrocarbons",
            "topics": [
              {
                "name": "Alkanes — IUPAC Nomenclature and Isomers",
                "slug": "alkanes-nomenclature"
              },
              {
                "name": "Alkanes — Preparation",
                "slug": "alkanes-prep"
              },
              {
                "name": "Alkanes — Physical Properties",
                "slug": "alkanes-physical"
              },
              {
                "name": "Free Radical Halogenation — Mechanism and Selectivity",
                "slug": "free-radical-halogenation"
              },
              {
                "name": "Alkanes — Combustion",
                "slug": "alkanes-combustion"
              },
              {
                "name": "Alkenes — IUPAC and Structural Isomers",
                "slug": "alkenes-nomenclature"
              },
              {
                "name": "Alkenes — Preparation (Dehydration, Dehydrohalogenation)",
                "slug": "alkenes-prep"
              },
              {
                "name": "Mechanism of Electrophilic Addition",
                "slug": "eas-mechanism-alkenes"
              },
              {
                "name": "Markovnikov's Rule",
                "slug": "markovnikov-rule"
              },
              {
                "name": "Anti-Markovnikov (Peroxide Effect / HBr only)",
                "slug": "anti-markovnikov"
              }
            ]
          },
          {
            "name": "Environmental Chemistry",
            "slug": "environmental-chemistry",
            "topics": [
              {
                "name": "Troposphere, Stratosphere, Mesosphere, Thermosphere",
                "slug": "atmospheric-layers"
              },
              {
                "name": "Tropospheric Pollution — Gaseous Pollutants",
                "slug": "gaseous-pollutants"
              },
              {
                "name": "Particulate Pollutants",
                "slug": "particulate-pollutants"
              },
              {
                "name": "Smog — Classical and Photochemical",
                "slug": "smog-types"
              },
              {
                "name": "Acid Rain — Formation and Effects on Ecosystem",
                "slug": "acid-rain"
              },
              {
                "name": "Greenhouse Effect and Global Warming",
                "slug": "greenhouse-global-warming"
              },
              {
                "name": "Ozone Layer — Formation and Depletion (CFCs)",
                "slug": "ozone-layer-depletion"
              },
              {
                "name": "Water Pollution — Industrial, Domestic, Agricultural",
                "slug": "water-pollution-sources"
              },
              {
                "name": "BOD and COD",
                "slug": "bod-cod"
              },
              {
                "name": "Water Treatment",
                "slug": "water-treatment"
              }
            ]
          },
          {
            "name": "The Solid State",
            "slug": "solid-state",
            "topics": [
              {
                "name": "Crystalline vs Amorphous Solids",
                "slug": "crystalline-amorphous"
              },
              {
                "name": "Types of Solids — Ionic, Molecular, Covalent, Metallic",
                "slug": "solid-types"
              },
              {
                "name": "Crystal Lattice and Unit Cell",
                "slug": "crystal-lattice"
              },
              {
                "name": "Primitive (SCC), BCC and FCC Unit Cells",
                "slug": "unit-cell-types"
              },
              {
                "name": "Number of Atoms per Unit Cell",
                "slug": "atoms-per-cell"
              },
              {
                "name": "Packing Efficiency — SCC (52.4%), BCC (68%), FCC (74%)",
                "slug": "packing-efficiency"
              },
              {
                "name": "Tetrahedral and Octahedral Voids",
                "slug": "voids-types"
              },
              {
                "name": "Close Packing in 2D and 3D — HCP and CCP",
                "slug": "close-packing"
              },
              {
                "name": "Density Calculation from Unit Cell",
                "slug": "density-calculation"
              },
              {
                "name": "Structures — NaCl, ZnS (Zinc Blende and Wurtzite), CsCl, Diamond",
                "slug": "ionic-structures"
              }
            ]
          },
          {
            "name": "Solutions",
            "slug": "solutions",
            "topics": [
              {
                "name": "Types of Solutions — Solid, Liquid, Gas",
                "slug": "solution-types"
              },
              {
                "name": "Solubility of Solid in Liquid",
                "slug": "solubility-solid"
              },
              {
                "name": "Henry's Law for Gas Solubility",
                "slug": "henrys-law"
              },
              {
                "name": "Concentration Terms — Molarity, Molality, Mole Fraction, % w/v, ppm",
                "slug": "concentration-terms"
              },
              {
                "name": "Interconversion of Concentration Terms",
                "slug": "concentration-interconversion"
              },
              {
                "name": "Vapour Pressure and Raoult's Law",
                "slug": "raoults-law"
              },
              {
                "name": "Raoult's Law for Volatile-Volatile Mixtures",
                "slug": "raoult-volatile-mix"
              },
              {
                "name": "Ideal and Non-Ideal Solutions",
                "slug": "ideal-nonideal"
              },
              {
                "name": "Positive Deviation (PA > PA° xA)",
                "slug": "positive-deviation"
              },
              {
                "name": "Negative Deviation",
                "slug": "negative-deviation"
              }
            ]
          },
          {
            "name": "Electrochemistry",
            "slug": "electrochemistry",
            "topics": [
              {
                "name": "Electrochemical Cell — Galvanic vs Electrolytic",
                "slug": "cell-types"
              },
              {
                "name": "Daniel Cell — Working and Cell Reaction",
                "slug": "daniel-cell"
              },
              {
                "name": "Cell Notation and Salt Bridge Function",
                "slug": "cell-notation"
              },
              {
                "name": "Standard Electrode Potential (E° at SHE)",
                "slug": "standard-electrode"
              },
              {
                "name": "Cell Potential (E°cell = E°cathode - E°anode)",
                "slug": "cell-potential"
              },
              {
                "name": "Electrochemical Series and Applications",
                "slug": "electrochemical-series"
              },
              {
                "name": "Nernst Equation",
                "slug": "nernst-equation"
              },
              {
                "name": "Equilibrium Constant from E°cell (lnK = nFE°/RT)",
                "slug": "k-from-ecell"
              },
              {
                "name": "Relationship ΔG° = -nFE°",
                "slug": "delta-g-ecell"
              },
              {
                "name": "Electrolysis — Faraday's First Law",
                "slug": "faradays-first"
              }
            ]
          },
          {
            "name": "Chemical Kinetics",
            "slug": "chemical-kinetics",
            "topics": [
              {
                "name": "Rate of Reaction — Average and Instantaneous",
                "slug": "rate-of-reaction"
              },
              {
                "name": "Rate Expression and Rate Constant Units",
                "slug": "rate-expression-units"
              },
              {
                "name": "Factors Affecting Rate",
                "slug": "rate-factors"
              },
              {
                "name": "Rate Law (Rate = k[A]^m[B]^n)",
                "slug": "rate-law"
              },
              {
                "name": "Order of Reaction — Zero, First, Second",
                "slug": "order-types"
              },
              {
                "name": "Molecularity",
                "slug": "molecularity"
              },
              {
                "name": "Integrated Rate Law — Zero Order",
                "slug": "zero-order-integrated"
              },
              {
                "name": "Integrated Rate Law — First Order (k = (2.303/t)log(a/(a-x)))",
                "slug": "first-order-integrated"
              },
              {
                "name": "Half-Life — Zero Order (t₁/₂ = a/2k)",
                "slug": "half-life-zero"
              },
              {
                "name": "Half-Life — First Order (t₁/₂ = 0.693/k)",
                "slug": "half-life-first"
              }
            ]
          },
          {
            "name": "Surface Chemistry",
            "slug": "surface-chemistry",
            "topics": [
              {
                "name": "Adsorption — Physisorption vs Chemisorption",
                "slug": "adsorption-types"
              },
              {
                "name": "Freundlich Adsorption Isotherm",
                "slug": "freundlich-isotherm"
              },
              {
                "name": "Langmuir Adsorption Isotherm",
                "slug": "langmuir-isotherm"
              },
              {
                "name": "Factors Affecting Adsorption",
                "slug": "adsorption-factors"
              },
              {
                "name": "Homogeneous Catalysis",
                "slug": "homogeneous-catalysis"
              },
              {
                "name": "Heterogeneous Catalysis — Mechanism",
                "slug": "heterogeneous-catalysis"
              },
              {
                "name": "Enzyme Catalysis and Lock-Key Mechanism",
                "slug": "enzyme-catalysis"
              },
              {
                "name": "Zeolites",
                "slug": "zeolites"
              },
              {
                "name": "Colloid — Definition, Types and Classification",
                "slug": "colloid-types"
              },
              {
                "name": "Preparation of Colloids — Chemical, Bredig's Arc",
                "slug": "colloid-preparation"
              }
            ]
          },
          {
            "name": "General Principles and Processes of Isolation of Elements",
            "slug": "metallurgy",
            "topics": [
              {
                "name": "Minerals and Ores",
                "slug": "minerals-ores"
              },
              {
                "name": "Concentration — Gravity Separation, Froth Flotation",
                "slug": "concentration-methods"
              },
              {
                "name": "Electromagnetic Separation and Chemical Leaching",
                "slug": "electromagnetic-leaching"
              },
              {
                "name": "Calcination and Roasting",
                "slug": "calcination-roasting"
              },
              {
                "name": "Smelting and Carbon Reduction",
                "slug": "smelting-reduction"
              },
              {
                "name": "Thermodynamic Principles — Ellingham Diagram",
                "slug": "ellingham-diagram"
              },
              {
                "name": "Electrochemical Reduction",
                "slug": "electrochemical-reduction"
              },
              {
                "name": "Refining — Distillation, Liquation",
                "slug": "refining-distillation"
              },
              {
                "name": "Electrolytic Refining",
                "slug": "electrolytic-refining"
              },
              {
                "name": "Zone Refining",
                "slug": "zone-refining"
              }
            ]
          },
          {
            "name": "The p-Block Elements (Groups 15, 16, 17 and 18)",
            "slug": "p-block-12",
            "topics": [
              {
                "name": "Group 15 — General Properties",
                "slug": "group15-general"
              },
              {
                "name": "Nitrogen — Physical and Chemical Properties",
                "slug": "nitrogen-properties"
              },
              {
                "name": "Ammonia — Haber Process, Properties and Uses",
                "slug": "ammonia-haber"
              },
              {
                "name": "Nitric Acid — Ostwald Process, Properties",
                "slug": "nitric-acid-ostwald"
              },
              {
                "name": "Oxides of Nitrogen (N₂O to N₂O₅)",
                "slug": "nitrogen-oxides"
              },
              {
                "name": "Oxoacids of Nitrogen",
                "slug": "oxoacids-nitrogen"
              },
              {
                "name": "Phosphorus — Allotropes",
                "slug": "phosphorus-allotropes"
              },
              {
                "name": "Phosphine (PH₃) — Preparation and Properties",
                "slug": "phosphine"
              },
              {
                "name": "PCl₃ and PCl₅ — Structure and Properties",
                "slug": "pcl3-pcl5"
              },
              {
                "name": "Oxoacids of Phosphorus",
                "slug": "oxoacids-phosphorus"
              }
            ]
          },
          {
            "name": "The d- and f-Block Elements",
            "slug": "d-f-block",
            "topics": [
              {
                "name": "Position and Electronic Configuration",
                "slug": "transition-position"
              },
              {
                "name": "Metallic Character and Melting Point",
                "slug": "transition-metallic"
              },
              {
                "name": "Density and Atomic/Ionic Radius Trend",
                "slug": "transition-radius"
              },
              {
                "name": "Variable Oxidation States and Stability",
                "slug": "variable-oxidation"
              },
              {
                "name": "Ionisation Enthalpy of Transition Metals",
                "slug": "transition-ie"
              },
              {
                "name": "Colour of Transition Metal Compounds",
                "slug": "transition-colour"
              },
              {
                "name": "Magnetic Properties — Spin-Only Formula",
                "slug": "spin-only-formula"
              },
              {
                "name": "Catalytic Properties",
                "slug": "transition-catalysis"
              },
              {
                "name": "Interstitial Compounds",
                "slug": "interstitial-compounds"
              },
              {
                "name": "Alloy Formation",
                "slug": "alloy-formation"
              }
            ]
          },
          {
            "name": "Coordination Compounds",
            "slug": "coordination-compounds",
            "topics": [
              {
                "name": "Werner's Theory of Coordination",
                "slug": "werners-theory"
              },
              {
                "name": "Key Terms — Coordination Entity, Central Atom, Ligand, CN",
                "slug": "key-terms"
              },
              {
                "name": "Types of Ligands — Mono, Bi, Poly, Ambidentate, Chelate",
                "slug": "types-ligands"
              },
              {
                "name": "IUPAC Nomenclature Rules",
                "slug": "iupac-rules-coord"
              },
              {
                "name": "IUPAC Nomenclature — Worked Examples",
                "slug": "iupac-worked"
              },
              {
                "name": "Isomerism — Ionisation Isomerism",
                "slug": "ionisation-isomerism"
              },
              {
                "name": "Hydrate, Linkage, Coordination Isomerism",
                "slug": "hydrate-linkage-coord"
              },
              {
                "name": "Geometric Isomerism — Square Planar and Octahedral",
                "slug": "geometric-isomerism"
              },
              {
                "name": "Optical Isomerism in Coordination Compounds",
                "slug": "optical-isomerism-coord"
              },
              {
                "name": "Valence Bond Theory (VBT) — Inner and Outer Orbital",
                "slug": "vbt-inner-outer"
              }
            ]
          },
          {
            "name": "Haloalkanes and Haloarenes",
            "slug": "haloalkanes-haloarenes",
            "topics": [
              {
                "name": "Classification and IUPAC Nomenclature",
                "slug": "halo-classification-iupac"
              },
              {
                "name": "Nature of C-X Bond and Physical Properties",
                "slug": "cx-bond-properties"
              },
              {
                "name": "Preparation from Alcohols, Alkenes and Alkanes",
                "slug": "halo-preparation"
              },
              {
                "name": "SN1 Mechanism — Steps and Energy Profile",
                "slug": "sn1-mechanism"
              },
              {
                "name": "SN2 Mechanism — Steps and Stereochemistry",
                "slug": "sn2-mechanism"
              },
              {
                "name": "Factors — Substrate, Nucleophile, Solvent, Leaving Group",
                "slug": "sn-factors"
              },
              {
                "name": "Walden Inversion in SN2",
                "slug": "walden-inversion"
              },
              {
                "name": "E1 Elimination Mechanism",
                "slug": "e1-mechanism"
              },
              {
                "name": "E2 Elimination and Zaitsev's Rule",
                "slug": "e2-zaitsev"
              },
              {
                "name": "SN2 vs E2 Competition",
                "slug": "sn2-e2-competition"
              }
            ]
          },
          {
            "name": "Alcohols, Phenols and Ethers",
            "slug": "alcohols-phenols-ethers",
            "topics": [
              {
                "name": "Classification and IUPAC of Alcohols",
                "slug": "alcohol-classification-iupac"
              },
              {
                "name": "Preparation of Monohydric Alcohols",
                "slug": "alcohol-monohydric-prep"
              },
              {
                "name": "Preparation from Grignard Reagent",
                "slug": "grignard-prep"
              },
              {
                "name": "Physical Properties — Boiling Points, Hydrogen Bonding",
                "slug": "alcohol-physical"
              },
              {
                "name": "Chemical Reactions — Acidity of Alcohols",
                "slug": "alcohol-acidity"
              },
              {
                "name": "Esterification (Fischer-Speier)",
                "slug": "esterification"
              },
              {
                "name": "Dehydration — E1 and E2 Pathway",
                "slug": "dehydration"
              },
              {
                "name": "Lucas Test",
                "slug": "lucas-test"
              },
              {
                "name": "Oxidation — Primary to Aldehyde/Acid, Secondary to Ketone",
                "slug": "alcohol-oxidation"
              },
              {
                "name": "Preparation of Phenols",
                "slug": "phenol-prep"
              }
            ]
          },
          {
            "name": "Aldehydes, Ketones and Carboxylic Acids",
            "slug": "aldehydes-ketones-acids",
            "topics": [
              {
                "name": "Nomenclature and Classification",
                "slug": "carbonyl-nomenclature"
              },
              {
                "name": "Preparation of Aldehydes",
                "slug": "aldehyde-prep"
              },
              {
                "name": "Preparation of Ketones",
                "slug": "ketone-prep"
              },
              {
                "name": "Physical Properties",
                "slug": "carbonyl-physical"
              },
              {
                "name": "Nucleophilic Addition — Mechanism",
                "slug": "nucleophilic-addition"
              },
              {
                "name": "Addition of HCN",
                "slug": "addition-hcn"
              },
              {
                "name": "Addition of NaHSO₃",
                "slug": "addition-nahso3"
              },
              {
                "name": "Addition of Grignard Reagent",
                "slug": "addition-grignard"
              },
              {
                "name": "Addition of NH₃ Derivatives",
                "slug": "addition-nh3-derivatives"
              },
              {
                "name": "Reduction — Clemmensen and Wolff-Kishner",
                "slug": "clemmensen-wolff-kishner"
              }
            ]
          },
          {
            "name": "Amines",
            "slug": "amines",
            "topics": [
              {
                "name": "Classification and IUPAC Nomenclature",
                "slug": "amines-nomenclature"
              },
              {
                "name": "Preparation — Gabriel Synthesis",
                "slug": "gabriel-synthesis"
              },
              {
                "name": "Hoffmann Bromamide Degradation",
                "slug": "hoffmann-degradation"
              },
              {
                "name": "Reduction of Nitrogen Compounds",
                "slug": "reduction-nitrogen"
              },
              {
                "name": "Physical Properties",
                "slug": "amines-physical"
              },
              {
                "name": "Basicity — pKb Values",
                "slug": "amines-basicity"
              },
              {
                "name": "Comparison — Aliphatic vs Aromatic Amines",
                "slug": "aliphatic-aromatic-amines"
              },
              {
                "name": "Effect of Substituents on Basicity",
                "slug": "substituent-basicity"
              },
              {
                "name": "Reactions with Acids and Acylation",
                "slug": "amine-acylation"
              },
              {
                "name": "Reaction with Nitrous Acid (Diazotisation)",
                "slug": "diazotisation"
              }
            ]
          },
          {
            "name": "Biomolecules",
            "slug": "biomolecules",
            "topics": [
              {
                "name": "Carbohydrates — Definition and Classification",
                "slug": "carbohydrates-classification"
              },
              {
                "name": "Glucose — Open Chain and Cyclic (Haworth) Structure",
                "slug": "glucose-structure"
              },
              {
                "name": "Fructose Structure and Mutarotation",
                "slug": "fructose-mutarotation"
              },
              {
                "name": "Disaccharides — Sucrose, Maltose, Lactose",
                "slug": "disaccharides"
              },
              {
                "name": "Polysaccharides — Starch, Cellulose, Glycogen",
                "slug": "polysaccharides"
              },
              {
                "name": "Reducing and Non-Reducing Sugars",
                "slug": "reducing-non-reducing"
              },
              {
                "name": "Glycosidic Bond",
                "slug": "glycosidic-bond"
              },
              {
                "name": "Amino Acids — Structure and Classification",
                "slug": "amino-acids-structure"
              },
              {
                "name": "Essential Amino Acids",
                "slug": "essential-amino-acids"
              },
              {
                "name": "Zwitter Ion",
                "slug": "zwitter-ion"
              }
            ]
          },
          {
            "name": "Polymers",
            "slug": "polymers",
            "topics": [
              {
                "name": "Polymer Terminology — Monomer, Repeat Unit, Chain",
                "slug": "polymer-terminology"
              },
              {
                "name": "Classification — Natural, Synthetic, Semi-Synthetic",
                "slug": "polymer-classification-origin"
              },
              {
                "name": "Classification — Addition and Condensation",
                "slug": "polymer-addition-cond"
              },
              {
                "name": "Classification — Biodegradable and Non-Biodegradable",
                "slug": "polymer-biodegradable"
              },
              {
                "name": "Addition Polymerisation — Free Radical Mechanism",
                "slug": "addition-mechanism"
              },
              {
                "name": "Condensation Polymerisation — Mechanism",
                "slug": "condensation-mechanism"
              },
              {
                "name": "Copolymerisation",
                "slug": "copolymerisation"
              },
              {
                "name": "Natural Rubber and Vulcanisation",
                "slug": "rubber-vulcanisation"
              },
              {
                "name": "Synthetic Rubbers — Neoprene, Buna-S, Buna-N",
                "slug": "synthetic-rubbers"
              },
              {
                "name": "Polyethylene — LDPE and HDPE",
                "slug": "polyethylene"
              }
            ]
          },
          {
            "name": "Chemistry in Everyday Life",
            "slug": "chemistry-everyday-life",
            "topics": [
              {
                "name": "Drugs — Definition and Classification",
                "slug": "drugs-classification"
              },
              {
                "name": "Drug-Target Interaction — Enzyme and Receptor",
                "slug": "drug-target-interaction"
              },
              {
                "name": "Analgesics — Narcotics and Non-Narcotics",
                "slug": "analgesics"
              },
              {
                "name": "Tranquilisers",
                "slug": "tranquilisers"
              },
              {
                "name": "Antiseptics and Disinfectants",
                "slug": "antiseptics-disinfectants"
              },
              {
                "name": "Antibiotics — Bactericidal and Bacteriostatic",
                "slug": "antibiotics"
              },
              {
                "name": "Antacids and Antihistamines",
                "slug": "antacids-antihistamines"
              },
              {
                "name": "Antifertility Drugs",
                "slug": "antifertility"
              },
              {
                "name": "Chemicals in Food — Preservatives",
                "slug": "food-preservatives"
              },
              {
                "name": "Artificial Sweeteners",
                "slug": "artificial-sweeteners"
              }
            ]
          }
        ]
      },
      {
        "name": "Mathematics",
        "slug": "mathematics",
        "chapters": [
          {
            "name": "Sets",
            "slug": "sets",
            "topics": [
              {
                "name": "Sets — Definition and Representation (Roster, Set-Builder)",
                "slug": "sets-def-representation"
              },
              {
                "name": "Types of Sets — Empty, Finite, Infinite, Equal, Singleton",
                "slug": "types-sets"
              },
              {
                "name": "Subsets and Power Set",
                "slug": "subsets-power-set"
              },
              {
                "name": "Universal Set and Complement",
                "slug": "universal-complement"
              },
              {
                "name": "Union and Intersection of Sets",
                "slug": "union-intersection"
              },
              {
                "name": "Difference and Symmetric Difference",
                "slug": "difference-symmetric"
              },
              {
                "name": "De Morgan's Laws",
                "slug": "de-morgans-laws"
              },
              {
                "name": "Venn Diagrams and Problems",
                "slug": "venn-diagrams"
              },
              {
                "name": "Cartesian Product of Sets",
                "slug": "cartesian-product"
              },
              {
                "name": "Number of Elements in A∪B, A∩B (Inclusion-Exclusion)",
                "slug": "inclusion-exclusion"
              }
            ]
          },
          {
            "name": "Relations and Functions",
            "slug": "relations-functions",
            "topics": [
              {
                "name": "Ordered Pair and Cartesian Product",
                "slug": "ordered-pair"
              },
              {
                "name": "Relation — Definition, Domain, Range, Codomain",
                "slug": "relation-definition"
              },
              {
                "name": "Types of Relations — Reflexive, Symmetric, Transitive",
                "slug": "relation-types"
              },
              {
                "name": "Equivalence Relation",
                "slug": "equivalence-relation"
              },
              {
                "name": "Function — Definition and Examples",
                "slug": "function-definition"
              },
              {
                "name": "Domain, Codomain and Range",
                "slug": "domain-range"
              },
              {
                "name": "One-One (Injective) Functions",
                "slug": "one-one"
              },
              {
                "name": "Onto (Surjective) and Bijective Functions",
                "slug": "onto-bijective"
              },
              {
                "name": "Number of Functions and Bijections",
                "slug": "counting-functions"
              },
              {
                "name": "Algebra of Functions (Sum, Difference, Product, Quotient)",
                "slug": "algebra-functions"
              }
            ]
          },
          {
            "name": "Trigonometric Functions",
            "slug": "trigonometric-functions",
            "topics": [
              {
                "name": "Measurement of Angles — Radian and Degree",
                "slug": "radian-degree"
              },
              {
                "name": "Arc Length and Area of Sector",
                "slug": "arc-sector"
              },
              {
                "name": "Trigonometric Functions — Definition",
                "slug": "trig-def"
              },
              {
                "name": "Signs of Trig Functions in all Quadrants (ASTC)",
                "slug": "signs-quadrants"
              },
              {
                "name": "Values at Standard Angles (0°, 30°, 45°, 60°, 90°)",
                "slug": "standard-angle-values"
              },
              {
                "name": "Trig Functions of Allied Angles",
                "slug": "allied-angles"
              },
              {
                "name": "Fundamental Identities",
                "slug": "fundamental-identities"
              },
              {
                "name": "Compound Angle Formulae (A+B, A-B)",
                "slug": "compound-angles"
              },
              {
                "name": "Double Angle Formulae (2A)",
                "slug": "double-angle"
              },
              {
                "name": "Triple Angle Formulae (3A)",
                "slug": "triple-angle"
              }
            ]
          },
          {
            "name": "Principle of Mathematical Induction",
            "slug": "mathematical-induction",
            "topics": [
              {
                "name": "Motivation and Principle of Mathematical Induction",
                "slug": "pmi-motivation"
              },
              {
                "name": "Proving Summation Formulae by PMI",
                "slug": "pmi-summation"
              },
              {
                "name": "Proving Divisibility Results by PMI",
                "slug": "pmi-divisibility"
              },
              {
                "name": "Proving Inequalities by PMI",
                "slug": "pmi-inequalities"
              },
              {
                "name": "Second Principle of Induction",
                "slug": "pmi-second"
              }
            ]
          },
          {
            "name": "Complex Numbers and Quadratic Equations",
            "slug": "complex-numbers-quadratic",
            "topics": [
              {
                "name": "Need for Complex Numbers and Imaginary Unit i",
                "slug": "need-complex"
              },
              {
                "name": "Complex Number z = a + ib",
                "slug": "complex-form"
              },
              {
                "name": "Algebra — Addition, Subtraction, Multiplication, Division",
                "slug": "complex-algebra"
              },
              {
                "name": "Modulus and Argument (Principal Value)",
                "slug": "modulus-argument"
              },
              {
                "name": "Polar Form r(cosθ + i sinθ)",
                "slug": "polar-form"
              },
              {
                "name": "Euler's Form re^(iθ)",
                "slug": "euler-form"
              },
              {
                "name": "de Moivre's Theorem and Proof",
                "slug": "de-moivres"
              },
              {
                "name": "Cube Roots of Unity (ω and ω²) and Properties",
                "slug": "cube-roots-unity"
              },
              {
                "name": "nth Roots of Unity",
                "slug": "nth-roots-unity"
              },
              {
                "name": "Locus Problems in Argand Plane",
                "slug": "argand-locus"
              }
            ]
          },
          {
            "name": "Linear Inequalities",
            "slug": "linear-inequalities",
            "topics": [
              {
                "name": "Types of Inequalities and Notation",
                "slug": "inequality-notation"
              },
              {
                "name": "Properties of Inequalities",
                "slug": "inequality-properties"
              },
              {
                "name": "Linear Inequalities in One Variable — Solution",
                "slug": "one-var-ineq"
              },
              {
                "name": "Number Line Representation",
                "slug": "number-line-ineq"
              },
              {
                "name": "Linear Inequalities in Two Variables",
                "slug": "two-var-ineq"
              },
              {
                "name": "Graphical Representation — Half Plane",
                "slug": "half-plane"
              },
              {
                "name": "System of Linear Inequalities — Feasible Region",
                "slug": "feasible-region-ineq"
              },
              {
                "name": "Practical Problems on Inequalities",
                "slug": "practical-ineq"
              }
            ]
          },
          {
            "name": "Permutations and Combinations",
            "slug": "permutations-combinations",
            "topics": [
              {
                "name": "Fundamental Counting Principle",
                "slug": "counting-principle"
              },
              {
                "name": "Factorial Notation",
                "slug": "factorial"
              },
              {
                "name": "Permutation Formula (nPr)",
                "slug": "npr-formula"
              },
              {
                "name": "Permutations with All Objects",
                "slug": "all-objects-perm"
              },
              {
                "name": "Permutations with Restrictions",
                "slug": "restricted-perm"
              },
              {
                "name": "Circular Permutations",
                "slug": "circular-perm"
              },
              {
                "name": "Permutations of Identical Objects",
                "slug": "identical-perm"
              },
              {
                "name": "Combination Formula (nCr)",
                "slug": "ncr-formula"
              },
              {
                "name": "Combinations — Properties and Identities",
                "slug": "ncr-properties"
              },
              {
                "name": "Combinations with Restrictions",
                "slug": "restricted-comb"
              }
            ]
          },
          {
            "name": "Binomial Theorem",
            "slug": "binomial-theorem",
            "topics": [
              {
                "name": "Binomial Theorem for Positive Integer n",
                "slug": "binomial-positive-int"
              },
              {
                "name": "Pascal's Triangle",
                "slug": "pascals-triangle"
              },
              {
                "name": "General Term Tr+1 = nCr · x^(n-r) · y^r",
                "slug": "general-term"
              },
              {
                "name": "Finding a Specific Term",
                "slug": "specific-term"
              },
              {
                "name": "Middle Term(s)",
                "slug": "middle-term"
              },
              {
                "name": "Term Independent of x",
                "slug": "term-independent-x"
              },
              {
                "name": "Properties of Binomial Coefficients",
                "slug": "binomial-coeff-properties"
              },
              {
                "name": "Sum of Coefficients",
                "slug": "sum-coefficients"
              },
              {
                "name": "Binomial Theorem for Rational Index (Approximation)",
                "slug": "rational-index"
              },
              {
                "name": "Greatest Term in Binomial Expansion",
                "slug": "greatest-term"
              }
            ]
          },
          {
            "name": "Sequences and Series",
            "slug": "sequences-series",
            "topics": [
              {
                "name": "Sequence — General Term and Pattern",
                "slug": "sequence-general-term"
              },
              {
                "name": "AP — nth Term (an = a + (n-1)d)",
                "slug": "ap-nth-term"
              },
              {
                "name": "AP — Sum of n Terms (Sn = n/2(2a + (n-1)d))",
                "slug": "ap-sum"
              },
              {
                "name": "AP — Properties",
                "slug": "ap-properties"
              },
              {
                "name": "Insertion of Arithmetic Means",
                "slug": "am-insertion"
              },
              {
                "name": "GP — nth Term (an = ar^(n-1))",
                "slug": "gp-nth-term"
              },
              {
                "name": "GP — Sum of n Terms",
                "slug": "gp-sum"
              },
              {
                "name": "GP — Sum of Infinite Terms (S∞ = a/(1-r), |r|<1)",
                "slug": "gp-infinite-sum"
              },
              {
                "name": "Insertion of Geometric Means",
                "slug": "gm-insertion"
              },
              {
                "name": "HP — nth Term and Problems",
                "slug": "hp-nth-term"
              }
            ]
          },
          {
            "name": "Straight Lines",
            "slug": "straight-lines",
            "topics": [
              {
                "name": "Slope of a Line — Formula and Inclination",
                "slug": "slope-line"
              },
              {
                "name": "Conditions for Parallel and Perpendicular",
                "slug": "parallel-perpendicular-cond"
              },
              {
                "name": "Slope-Intercept Form (y = mx + c)",
                "slug": "slope-intercept-form"
              },
              {
                "name": "Point-Slope Form",
                "slug": "point-slope-form"
              },
              {
                "name": "Two-Point Form",
                "slug": "two-point-form"
              },
              {
                "name": "Intercept Form (x/a + y/b = 1)",
                "slug": "intercept-form"
              },
              {
                "name": "Normal Form (x cosα + y sinα = p)",
                "slug": "normal-form"
              },
              {
                "name": "General Form (ax + by + c = 0)",
                "slug": "general-form"
              },
              {
                "name": "Angle Between Two Lines (tanθ formula)",
                "slug": "angle-two-lines"
              },
              {
                "name": "Distance from Point to Line",
                "slug": "point-line-distance"
              }
            ]
          },
          {
            "name": "Conic Sections",
            "slug": "conic-sections",
            "topics": [
              {
                "name": "Circle — Standard Equation (x²+y²=r²)",
                "slug": "circle-standard"
              },
              {
                "name": "Circle — General Equation",
                "slug": "circle-general"
              },
              {
                "name": "Circle through 3 Points",
                "slug": "circle-3-points"
              },
              {
                "name": "Tangent to Circle — Condition and Equation",
                "slug": "circle-tangent"
              },
              {
                "name": "Normal to Circle",
                "slug": "circle-normal"
              },
              {
                "name": "Chord of Contact (T = 0)",
                "slug": "circle-chord-contact"
              },
              {
                "name": "Family of Circles",
                "slug": "circle-family"
              },
              {
                "name": "Radical Axis",
                "slug": "radical-axis"
              },
              {
                "name": "Parabola — Standard Forms (y²=4ax, x²=4ay)",
                "slug": "parabola-forms"
              },
              {
                "name": "Parabola — Parametric Equations",
                "slug": "parabola-parametric"
              }
            ]
          },
          {
            "name": "Introduction to Three Dimensional Geometry",
            "slug": "intro-3d-geometry",
            "topics": [
              {
                "name": "Coordinate Axes and Planes in 3D",
                "slug": "3d-axes-planes"
              },
              {
                "name": "Coordinates of a Point in Space",
                "slug": "3d-coordinates"
              },
              {
                "name": "Distance Formula in 3D",
                "slug": "3d-distance"
              },
              {
                "name": "Section Formula — Internal Division",
                "slug": "3d-section-internal"
              },
              {
                "name": "Section Formula — External Division",
                "slug": "3d-section-external"
              },
              {
                "name": "Midpoint Formula",
                "slug": "3d-midpoint"
              },
              {
                "name": "Centroid of Triangle and Tetrahedron",
                "slug": "3d-centroid"
              }
            ]
          },
          {
            "name": "Limits and Derivatives",
            "slug": "limits-derivatives",
            "topics": [
              {
                "name": "Intuitive Notion of Limit",
                "slug": "limit-intuition"
              },
              {
                "name": "Left-Hand Limit and Right-Hand Limit",
                "slug": "lhl-rhl"
              },
              {
                "name": "Existence of Limit",
                "slug": "limit-existence"
              },
              {
                "name": "Algebra of Limits",
                "slug": "algebra-limits"
              },
              {
                "name": "Standard Limits — sinx/x, tanx/x, (aˣ-1)/x, (xⁿ-aⁿ)/(x-a)",
                "slug": "standard-limits"
              },
              {
                "name": "Limit at Infinity and Infinite Limits",
                "slug": "limits-infinity"
              },
              {
                "name": "L'Hôpital's Rule",
                "slug": "lhopital-rule"
              },
              {
                "name": "Sandwich Theorem",
                "slug": "sandwich-theorem"
              },
              {
                "name": "Definition of Derivative — First Principles",
                "slug": "first-principles"
              },
              {
                "name": "Rules of Differentiation",
                "slug": "diff-rules"
              }
            ]
          },
          {
            "name": "Mathematical Reasoning",
            "slug": "mathematical-reasoning",
            "topics": [
              {
                "name": "Statements — Simple and Compound",
                "slug": "statements-types"
              },
              {
                "name": "Negation",
                "slug": "negation"
              },
              {
                "name": "Conjunction (∧) and Disjunction (∨)",
                "slug": "conjunction-disjunction"
              },
              {
                "name": "Implication (→) and Biconditional (↔)",
                "slug": "implication-biconditional"
              },
              {
                "name": "Truth Tables",
                "slug": "truth-tables"
              },
              {
                "name": "Tautology and Contradiction",
                "slug": "tautology-contradiction"
              },
              {
                "name": "Converse, Inverse and Contrapositive",
                "slug": "converse-inverse"
              },
              {
                "name": "Quantifiers — For All (∀) and There Exists (∃)",
                "slug": "quantifiers"
              },
              {
                "name": "Validity of Statements — Direct and Contradiction",
                "slug": "proof-methods"
              }
            ]
          },
          {
            "name": "Statistics",
            "slug": "statistics",
            "topics": [
              {
                "name": "Measures of Central Tendency — Mean, Median, Mode",
                "slug": "central-tendency"
              },
              {
                "name": "Mean for Grouped Data",
                "slug": "grouped-mean"
              },
              {
                "name": "Median for Grouped Data",
                "slug": "grouped-median"
              },
              {
                "name": "Mode for Grouped Data",
                "slug": "grouped-mode"
              },
              {
                "name": "Mean Deviation about Mean",
                "slug": "mean-deviation-mean"
              },
              {
                "name": "Mean Deviation about Median",
                "slug": "mean-deviation-median"
              },
              {
                "name": "Variance",
                "slug": "variance"
              },
              {
                "name": "Standard Deviation",
                "slug": "standard-deviation"
              },
              {
                "name": "Coefficient of Variation (CV)",
                "slug": "cv"
              },
              {
                "name": "Comparison of Two Distributions using CV",
                "slug": "compare-cv"
              }
            ]
          },
          {
            "name": "Probability",
            "slug": "probability-11",
            "topics": [
              {
                "name": "Random Experiment and Sample Space",
                "slug": "sample-space"
              },
              {
                "name": "Events — Simple, Compound, Complementary, Impossible",
                "slug": "event-types"
              },
              {
                "name": "Axiomatic Definition of Probability",
                "slug": "axiomatic-probability"
              },
              {
                "name": "Classical Definition — Equally Likely Outcomes",
                "slug": "classical-probability"
              },
              {
                "name": "Addition Theorem (P(A∪B) = P(A) + P(B) - P(A∩B))",
                "slug": "addition-theorem"
              },
              {
                "name": "Mutually Exclusive Events",
                "slug": "mutually-exclusive"
              },
              {
                "name": "Complement Rule (P(A') = 1 - P(A))",
                "slug": "complement-rule"
              },
              {
                "name": "Geometric Probability",
                "slug": "geometric-probability"
              }
            ]
          },
          {
            "name": "Relations and Functions",
            "slug": "relations-functions-12",
            "topics": [
              {
                "name": "Review — Types of Relations",
                "slug": "review-relations"
              },
              {
                "name": "Equivalence Relations and Classes",
                "slug": "equivalence-classes"
              },
              {
                "name": "One-One, Onto and Bijective Functions",
                "slug": "bijective-12"
              },
              {
                "name": "Composition of Functions and its Properties",
                "slug": "composition-12"
              },
              {
                "name": "Invertible Functions and Finding Inverse",
                "slug": "invertible-12"
              },
              {
                "name": "Binary Operations — Definition and Properties",
                "slug": "binary-operations"
              },
              {
                "name": "Commutativity, Associativity, Identity, Inverse",
                "slug": "binary-operation-properties"
              }
            ]
          },
          {
            "name": "Inverse Trigonometric Functions",
            "slug": "inverse-trig",
            "topics": [
              {
                "name": "Need for Restricted Domain",
                "slug": "restricted-domain"
              },
              {
                "name": "Domain and Range of sin⁻¹, cos⁻¹, tan⁻¹",
                "slug": "domain-range-main"
              },
              {
                "name": "Domain and Range of csc⁻¹, sec⁻¹, cot⁻¹",
                "slug": "domain-range-others"
              },
              {
                "name": "Graphs of Inverse Trig Functions",
                "slug": "graphs-inverse"
              },
              {
                "name": "Principal Value — Definition and Finding",
                "slug": "principal-value"
              },
              {
                "name": "Property — sin⁻¹(sinx) = x and sin(sin⁻¹x) = x",
                "slug": "inv-composition"
              },
              {
                "name": "Property — sin⁻¹x + cos⁻¹x = π/2",
                "slug": "complementary-inv"
              },
              {
                "name": "Property — tan⁻¹x + cot⁻¹x = π/2",
                "slug": "tan-cot-complementary"
              },
              {
                "name": "Addition Formula for tan⁻¹",
                "slug": "tan-addition"
              },
              {
                "name": "Double and Triple Angle Formulas in Inverse Trig",
                "slug": "double-triple-inv"
              }
            ]
          },
          {
            "name": "Matrices",
            "slug": "matrices",
            "topics": [
              {
                "name": "Matrix — Definition, Order and Types",
                "slug": "matrix-types"
              },
              {
                "name": "Matrix Equality",
                "slug": "matrix-equality"
              },
              {
                "name": "Addition and Subtraction of Matrices",
                "slug": "matrix-add-sub"
              },
              {
                "name": "Scalar Multiplication",
                "slug": "scalar-mult"
              },
              {
                "name": "Matrix Multiplication — Conditions and Rules",
                "slug": "matrix-multiplication"
              },
              {
                "name": "Properties of Matrix Multiplication",
                "slug": "mult-properties"
              },
              {
                "name": "Transpose of Matrix and Its Properties",
                "slug": "transpose"
              },
              {
                "name": "Symmetric and Skew-Symmetric Matrices",
                "slug": "symmetric-skew"
              },
              {
                "name": "Elementary Row Operations",
                "slug": "row-operations"
              },
              {
                "name": "Row Echelon Form",
                "slug": "row-echelon"
              }
            ]
          },
          {
            "name": "Determinants",
            "slug": "determinants",
            "topics": [
              {
                "name": "Determinant — Expansion along Row/Column (1×1, 2×2, 3×3)",
                "slug": "det-expansion"
              },
              {
                "name": "Properties of Determinants",
                "slug": "det-properties"
              },
              {
                "name": "Sarrus' Rule for 3×3 Determinant",
                "slug": "sarrus-rule"
              },
              {
                "name": "Minors and Cofactors",
                "slug": "minors-cofactors"
              },
              {
                "name": "Adjoint of a Matrix",
                "slug": "adjoint-matrix"
              },
              {
                "name": "Inverse of Matrix Using Adjoint (A⁻¹ = adj(A)/|A|)",
                "slug": "inverse-adjoint"
              },
              {
                "name": "Rank of a Matrix",
                "slug": "matrix-rank"
              },
              {
                "name": "System of Equations — Consistent and Inconsistent",
                "slug": "system-consistency"
              },
              {
                "name": "Cramer's Rule",
                "slug": "cramers-rule"
              },
              {
                "name": "Solving 3×3 System by Inverse Method",
                "slug": "inverse-method-system"
              }
            ]
          },
          {
            "name": "Continuity and Differentiability",
            "slug": "continuity-differentiability",
            "topics": [
              {
                "name": "Continuity at a Point — Definition",
                "slug": "continuity-def"
              },
              {
                "name": "Continuity from Left and Right",
                "slug": "continuity-left-right"
              },
              {
                "name": "Continuity of Common Functions",
                "slug": "continuity-common"
              },
              {
                "name": "Types of Discontinuities — Removable, Jump, Infinite",
                "slug": "discontinuity-types"
              },
              {
                "name": "Continuity on Closed Interval",
                "slug": "continuity-interval"
              },
              {
                "name": "Differentiability at a Point",
                "slug": "differentiability"
              },
              {
                "name": "Relation Between Continuity and Differentiability",
                "slug": "cont-diff-relation"
              },
              {
                "name": "Derivatives of Exponential Functions",
                "slug": "exp-derivatives"
              },
              {
                "name": "Derivatives of Logarithmic Functions",
                "slug": "log-derivatives"
              },
              {
                "name": "Derivatives of Inverse Trig Functions",
                "slug": "inv-trig-derivatives"
              }
            ]
          },
          {
            "name": "Application of Derivatives",
            "slug": "application-derivatives",
            "topics": [
              {
                "name": "Rate of Change of Quantities",
                "slug": "rate-of-change"
              },
              {
                "name": "Slope of Tangent and Normal",
                "slug": "slope-tangent-normal"
              },
              {
                "name": "Equation of Tangent",
                "slug": "equation-tangent"
              },
              {
                "name": "Equation of Normal",
                "slug": "equation-normal"
              },
              {
                "name": "Angle of Intersection of Two Curves",
                "slug": "angle-intersection-curves"
              },
              {
                "name": "Orthogonal Curves",
                "slug": "orthogonal-curves"
              },
              {
                "name": "Increasing and Decreasing Functions — Test",
                "slug": "increasing-decreasing"
              },
              {
                "name": "Monotonicity in Interval",
                "slug": "monotonicity"
              },
              {
                "name": "Critical Points",
                "slug": "critical-points"
              },
              {
                "name": "First Derivative Test for Extrema",
                "slug": "first-derivative-test"
              }
            ]
          },
          {
            "name": "Integrals",
            "slug": "integrals",
            "topics": [
              {
                "name": "Integration as Anti-Differentiation",
                "slug": "anti-diff"
              },
              {
                "name": "Standard Integrals — Power, Trig, Exp, Log",
                "slug": "standard-integrals"
              },
              {
                "name": "Integration by Substitution",
                "slug": "substitution"
              },
              {
                "name": "Integration of sin^m(x)·cos^n(x) forms",
                "slug": "sinm-cosn-forms"
              },
              {
                "name": "Integration Using Partial Fractions (All Cases)",
                "slug": "partial-fractions-all"
              },
              {
                "name": "Integration by Parts (ILATE)",
                "slug": "integration-by-parts"
              },
              {
                "name": "Special Integrals — ∫√(a²-x²)dx, ∫√(a²+x²)dx",
                "slug": "special-integrals"
              },
              {
                "name": "Integration of Rational Functions",
                "slug": "rational-integrals"
              },
              {
                "name": "Reduction Formulae",
                "slug": "reduction-formulae"
              },
              {
                "name": "Definite Integrals — Riemann Sum",
                "slug": "definite-riemann"
              }
            ]
          },
          {
            "name": "Application of Integrals",
            "slug": "application-integrals",
            "topics": [
              {
                "name": "Area Under Curve Using Definite Integral",
                "slug": "area-under-curve"
              },
              {
                "name": "Area Between Two Curves",
                "slug": "area-two-curves"
              },
              {
                "name": "Area Bounded by Parabola and Line",
                "slug": "area-parabola-line"
              },
              {
                "name": "Area Bounded by Circle",
                "slug": "area-circle"
              },
              {
                "name": "Area Using Horizontal and Vertical Strips",
                "slug": "horizontal-vertical-strips"
              }
            ]
          },
          {
            "name": "Differential Equations",
            "slug": "differential-equations",
            "topics": [
              {
                "name": "Ordinary Differential Equations — Order and Degree",
                "slug": "ode-order-degree"
              },
              {
                "name": "Formation of Differential Equation",
                "slug": "de-formation"
              },
              {
                "name": "Variable Separable Method",
                "slug": "variable-separable-de"
              },
              {
                "name": "Homogeneous Differential Equations",
                "slug": "homogeneous-de"
              },
              {
                "name": "Linear DE of First Order — dy/dx + Py = Q",
                "slug": "linear-de-first"
              },
              {
                "name": "Integrating Factor",
                "slug": "integrating-factor"
              },
              {
                "name": "Bernoulli's Equation",
                "slug": "bernoulli-de"
              },
              {
                "name": "Applications — Growth and Decay",
                "slug": "growth-decay"
              },
              {
                "name": "Applications — Newton's Law of Cooling",
                "slug": "cooling-de"
              },
              {
                "name": "Applications — Population Models",
                "slug": "population-de"
              }
            ]
          },
          {
            "name": "Vector Algebra",
            "slug": "vector-algebra",
            "topics": [
              {
                "name": "Vectors — Definition and Types",
                "slug": "vector-types"
              },
              {
                "name": "Addition of Vectors — Triangle and Parallelogram Law",
                "slug": "vector-addition-laws"
              },
              {
                "name": "Subtraction of Vectors",
                "slug": "vector-subtraction"
              },
              {
                "name": "Scalar Multiplication",
                "slug": "vector-scalar-mult"
              },
              {
                "name": "Position Vector",
                "slug": "position-vector"
              },
              {
                "name": "Components of Vector (i, j, k)",
                "slug": "vector-components"
              },
              {
                "name": "Magnitude of Vector",
                "slug": "vector-magnitude"
              },
              {
                "name": "Unit Vector",
                "slug": "unit-vector"
              },
              {
                "name": "Section Formula — Internal and External",
                "slug": "section-formula"
              },
              {
                "name": "Dot Product — Definition (a·b = |a||b|cosθ)",
                "slug": "dot-product-def"
              }
            ]
          },
          {
            "name": "Three Dimensional Geometry",
            "slug": "3d-geometry",
            "topics": [
              {
                "name": "Direction Cosines (l, m, n) and Properties",
                "slug": "direction-cosines"
              },
              {
                "name": "Direction Ratios and Conversion",
                "slug": "direction-ratios"
              },
              {
                "name": "Angle Between Two Lines using DC/DR",
                "slug": "angle-using-dc"
              },
              {
                "name": "Equation of Line — Vector Form",
                "slug": "line-vector"
              },
              {
                "name": "Equation of Line — Symmetric/Cartesian Form",
                "slug": "line-cartesian"
              },
              {
                "name": "Passing Through Two Points",
                "slug": "line-two-points"
              },
              {
                "name": "Angle Between Two Lines",
                "slug": "angle-two-lines-3d"
              },
              {
                "name": "Distance Between Point and Line",
                "slug": "point-line-3d"
              },
              {
                "name": "Skew Lines — Shortest Distance",
                "slug": "skew-shortest-distance"
              },
              {
                "name": "Distance Between Parallel Lines",
                "slug": "parallel-lines-3d"
              }
            ]
          },
          {
            "name": "Linear Programming",
            "slug": "linear-programming",
            "topics": [
              {
                "name": "LPP — Formulation from Word Problems",
                "slug": "lpp-formulation"
              },
              {
                "name": "Corner Point Method",
                "slug": "corner-point-method"
              },
              {
                "name": "Bounded and Unbounded Feasible Region",
                "slug": "feasible-region-types"
              },
              {
                "name": "Optimal Solution",
                "slug": "optimal-solution"
              },
              {
                "name": "Problems — Diet, Allocation, Transport",
                "slug": "lpp-problem-types"
              },
              {
                "name": "No Optimal Solution Case",
                "slug": "no-optimal-solution"
              }
            ]
          },
          {
            "name": "Probability",
            "slug": "probability-12",
            "topics": [
              {
                "name": "Conditional Probability — Definition and Formula",
                "slug": "conditional-prob"
              },
              {
                "name": "Properties of Conditional Probability",
                "slug": "conditional-properties"
              },
              {
                "name": "Multiplication Theorem (P(A∩B) = P(A)·P(B|A))",
                "slug": "multiplication-theorem"
              },
              {
                "name": "Independent Events — Condition",
                "slug": "independent-events"
              },
              {
                "name": "Total Probability Theorem",
                "slug": "total-probability"
              },
              {
                "name": "Bayes' Theorem",
                "slug": "bayes-theorem"
              },
              {
                "name": "Partition of Sample Space",
                "slug": "partition-sample-space"
              },
              {
                "name": "Random Variable — Discrete and Continuous",
                "slug": "random-variable"
              },
              {
                "name": "Probability Distribution Table",
                "slug": "prob-distribution-table"
              },
              {
                "name": "Mean (Expected Value) of RV",
                "slug": "mean-rv"
              }
            ]
          }
        ]
      }
    ]
  },
  "neet": {
    "name": "NEET",
    "subjects": [
      {
        "name": "Physics",
        "slug": "physics",
        "chapters": [
          {
            "name": "Physical World",
            "slug": "physical-world",
            "topics": [
              {
                "name": "Physics and Its Scope",
                "slug": "physics-scope"
              },
              {
                "name": "Fundamental Forces — Gravitational, Electromagnetic, Strong, Weak",
                "slug": "fundamental-forces"
              },
              {
                "name": "Nature of Physical Laws",
                "slug": "physical-laws"
              }
            ]
          },
          {
            "name": "Units and Measurements",
            "slug": "units-and-measurements",
            "topics": [
              {
                "name": "Physical Quantities — Fundamental and Derived",
                "slug": "fundamental-derived"
              },
              {
                "name": "SI Units and Their Definitions",
                "slug": "si-units"
              },
              {
                "name": "Dimensional Formula and Dimensional Equation",
                "slug": "dimensional-formula"
              },
              {
                "name": "Dimensional Analysis — Checking Consistency",
                "slug": "dimensional-consistency"
              },
              {
                "name": "Dimensional Analysis — Deriving Relations",
                "slug": "dimensional-deriving"
              },
              {
                "name": "Dimensional Analysis — Conversion of Units",
                "slug": "dimensional-conversion"
              },
              {
                "name": "Significant Figures and Rules",
                "slug": "significant-figures"
              },
              {
                "name": "Rounding Off Numbers",
                "slug": "rounding-off"
              },
              {
                "name": "Types of Errors — Systematic and Random",
                "slug": "error-types"
              },
              {
                "name": "Absolute, Relative and Percentage Error",
                "slug": "absolute-relative-error"
              }
            ]
          },
          {
            "name": "Motion in a Straight Line",
            "slug": "motion-straight-line",
            "topics": [
              {
                "name": "Position, Path Length and Displacement",
                "slug": "position-displacement"
              },
              {
                "name": "Average Velocity and Instantaneous Velocity",
                "slug": "velocity-types"
              },
              {
                "name": "Average Acceleration and Instantaneous Acceleration",
                "slug": "acceleration-types"
              },
              {
                "name": "Uniformly Accelerated Motion",
                "slug": "uniformly-accelerated"
              },
              {
                "name": "Kinematic Equations (v=u+at, s=ut+½at², v²=u²+2as)",
                "slug": "kinematic-equations"
              },
              {
                "name": "x-t, v-t and a-t Graphs — Analysis",
                "slug": "motion-graphs"
              },
              {
                "name": "Area under v-t Graph (Displacement)",
                "slug": "area-vt-graph"
              },
              {
                "name": "Free Fall and Motion Under Gravity",
                "slug": "free-fall"
              },
              {
                "name": "Reaction Time",
                "slug": "reaction-time"
              },
              {
                "name": "Relative Motion in 1D",
                "slug": "relative-motion-1d"
              }
            ]
          },
          {
            "name": "Motion in a Plane",
            "slug": "motion-plane",
            "topics": [
              {
                "name": "Scalars and Vectors — Definitions and Types",
                "slug": "scalars-vectors"
              },
              {
                "name": "Vector Addition — Triangle Law and Parallelogram Law",
                "slug": "vector-addition-laws"
              },
              {
                "name": "Resolution of Vectors into Components",
                "slug": "vector-resolution"
              },
              {
                "name": "Unit Vector and Position Vector",
                "slug": "unit-position-vector"
              },
              {
                "name": "Dot Product — Definition, Formula and Properties",
                "slug": "dot-product"
              },
              {
                "name": "Cross Product — Definition, Formula and Properties",
                "slug": "cross-product"
              },
              {
                "name": "Projectile Motion — Derivations (ToF, Range, Hmax)",
                "slug": "projectile-tof-range"
              },
              {
                "name": "Equation of Trajectory",
                "slug": "trajectory-equation"
              },
              {
                "name": "Projectile on Inclined Plane",
                "slug": "projectile-inclined"
              },
              {
                "name": "Uniform Circular Motion — Angular Quantities",
                "slug": "ucm-angular"
              }
            ]
          },
          {
            "name": "Laws of Motion",
            "slug": "laws-of-motion",
            "topics": [
              {
                "name": "Aristotle's Fallacy and Galileo's Law of Inertia",
                "slug": "aristotle-galileo"
              },
              {
                "name": "Newton's First Law — Inertia and Its Types",
                "slug": "first-law-inertia"
              },
              {
                "name": "Newton's Second Law — F = ma",
                "slug": "second-law-fma"
              },
              {
                "name": "Newton's Third Law and Action-Reaction Pairs",
                "slug": "third-law"
              },
              {
                "name": "Impulse and Impulsive Force",
                "slug": "impulse"
              },
              {
                "name": "Law of Conservation of Linear Momentum",
                "slug": "conservation-momentum"
              },
              {
                "name": "Free Body Diagram (FBD)",
                "slug": "fbd"
              },
              {
                "name": "Normal Force, Tension and Spring Force",
                "slug": "normal-tension-spring"
              },
              {
                "name": "Friction — Static, Kinetic and Rolling",
                "slug": "friction-types"
              },
              {
                "name": "Coefficient of Friction, Angle of Friction and Repose",
                "slug": "friction-coefficients"
              }
            ]
          },
          {
            "name": "Work, Energy and Power",
            "slug": "work-energy-power",
            "topics": [
              {
                "name": "Work Done by Constant and Variable Force",
                "slug": "work-constant-variable"
              },
              {
                "name": "Work-Energy Theorem",
                "slug": "work-energy-theorem"
              },
              {
                "name": "Kinetic Energy",
                "slug": "kinetic-energy"
              },
              {
                "name": "Gravitational Potential Energy",
                "slug": "gravitational-pe"
              },
              {
                "name": "Elastic Potential Energy in Spring (½kx²)",
                "slug": "spring-pe"
              },
              {
                "name": "Conservative and Non-Conservative Forces",
                "slug": "conservative-forces"
              },
              {
                "name": "Conservation of Mechanical Energy",
                "slug": "conservation-mech-energy"
              },
              {
                "name": "Power — Average and Instantaneous",
                "slug": "power-avg-inst"
              },
              {
                "name": "Collisions — Elastic and Inelastic in 1D",
                "slug": "elastic-inelastic-1d"
              },
              {
                "name": "Oblique Collisions (2D)",
                "slug": "oblique-collisions"
              }
            ]
          },
          {
            "name": "System of Particles and Rotational Motion",
            "slug": "rotational-motion",
            "topics": [
              {
                "name": "Centre of Mass — Discrete and Continuous Systems",
                "slug": "centre-of-mass"
              },
              {
                "name": "COM of Standard Bodies (Rod, Disc, Sphere, Cone, Triangle)",
                "slug": "com-standard-bodies"
              },
              {
                "name": "Motion of Centre of Mass",
                "slug": "com-motion"
              },
              {
                "name": "Angular Displacement, Velocity and Acceleration",
                "slug": "angular-kinematics"
              },
              {
                "name": "Equations of Rotational Motion",
                "slug": "rotational-equations"
              },
              {
                "name": "Torque — Definition and τ = Iα",
                "slug": "torque"
              },
              {
                "name": "Moment of Inertia — Definition and Physical Significance",
                "slug": "moi-definition"
              },
              {
                "name": "MI of Standard Bodies — Rod, Ring, Disc, Sphere, Cylinder",
                "slug": "moi-standard-bodies"
              },
              {
                "name": "Theorem of Parallel Axes",
                "slug": "parallel-axis-theorem"
              },
              {
                "name": "Theorem of Perpendicular Axes",
                "slug": "perpendicular-axis-theorem"
              }
            ]
          },
          {
            "name": "Gravitation",
            "slug": "gravitation",
            "topics": [
              {
                "name": "Kepler's Laws of Planetary Motion",
                "slug": "keplers-laws"
              },
              {
                "name": "Newton's Universal Law of Gravitation",
                "slug": "newtons-gravitation"
              },
              {
                "name": "Acceleration Due to Gravity (g) on Earth's Surface",
                "slug": "g-surface"
              },
              {
                "name": "Variation of g with Altitude",
                "slug": "g-altitude"
              },
              {
                "name": "Variation of g with Depth",
                "slug": "g-depth"
              },
              {
                "name": "Variation of g with Latitude and Rotation of Earth",
                "slug": "g-latitude-rotation"
              },
              {
                "name": "Gravitational Field Intensity",
                "slug": "gravitational-field"
              },
              {
                "name": "Gravitational Potential",
                "slug": "gravitational-potential"
              },
              {
                "name": "Gravitational Potential Energy",
                "slug": "gravitational-pe"
              },
              {
                "name": "Escape Velocity",
                "slug": "escape-velocity"
              }
            ]
          },
          {
            "name": "Mechanical Properties of Solids",
            "slug": "mechanical-properties-solids",
            "topics": [
              {
                "name": "Elasticity and Plasticity",
                "slug": "elasticity-plasticity"
              },
              {
                "name": "Types of Stress — Tensile, Compressive, Shear, Bulk",
                "slug": "stress-types"
              },
              {
                "name": "Types of Strain — Longitudinal, Shear, Volumetric",
                "slug": "strain-types"
              },
              {
                "name": "Stress-Strain Curve — Elastic Limit, Yield Point, UTS",
                "slug": "stress-strain-curve"
              },
              {
                "name": "Hooke's Law",
                "slug": "hookes-law"
              },
              {
                "name": "Young's Modulus — Definition and Numericals",
                "slug": "youngs-modulus"
              },
              {
                "name": "Bulk Modulus — Definition and Compressibility",
                "slug": "bulk-modulus"
              },
              {
                "name": "Shear Modulus (Modulus of Rigidity)",
                "slug": "shear-modulus"
              },
              {
                "name": "Poisson's Ratio",
                "slug": "poissons-ratio"
              },
              {
                "name": "Relations Among Elastic Constants",
                "slug": "elastic-constants-relation"
              }
            ]
          },
          {
            "name": "Mechanical Properties of Fluids",
            "slug": "mechanical-properties-fluids",
            "topics": [
              {
                "name": "Pressure — Thrust and Pressure in Fluid",
                "slug": "pressure-fluid"
              },
              {
                "name": "Pascal's Law and Its Applications",
                "slug": "pascals-law"
              },
              {
                "name": "Atmospheric Pressure — Gauge and Absolute",
                "slug": "atmospheric-gauge"
              },
              {
                "name": "Archimedes' Principle",
                "slug": "archimedes-principle"
              },
              {
                "name": "Buoyancy, Apparent Weight and Law of Floatation",
                "slug": "buoyancy-floatation"
              },
              {
                "name": "Equation of Continuity (A₁v₁ = A₂v₂)",
                "slug": "continuity-equation"
              },
              {
                "name": "Bernoulli's Theorem — Derivation and Applications",
                "slug": "bernoullis-theorem"
              },
              {
                "name": "Venturimeter and Pitot Tube",
                "slug": "venturimeter-pitot"
              },
              {
                "name": "Torricelli's Theorem and Speed of Efflux",
                "slug": "torricelli-efflux"
              },
              {
                "name": "Dynamic Lift — Magnus Effect, Aerofoil",
                "slug": "dynamic-lift"
              }
            ]
          },
          {
            "name": "Thermal Properties of Matter",
            "slug": "thermal-properties",
            "topics": [
              {
                "name": "Temperature Scales — Celsius, Kelvin, Fahrenheit",
                "slug": "temperature-scales"
              },
              {
                "name": "Thermal Expansion of Solids — α (Linear), β (Superficial), γ (Volumetric)",
                "slug": "expansion-solids"
              },
              {
                "name": "Thermal Expansion of Liquids — Absolute and Apparent",
                "slug": "expansion-liquids"
              },
              {
                "name": "Anomalous Expansion of Water",
                "slug": "anomalous-expansion"
              },
              {
                "name": "Thermal Expansion of Gases",
                "slug": "expansion-gases"
              },
              {
                "name": "Specific Heat Capacity and Heat Capacity",
                "slug": "specific-heat"
              },
              {
                "name": "Calorimetry — Principle and Numericals",
                "slug": "calorimetry"
              },
              {
                "name": "Latent Heat of Fusion and Vaporisation",
                "slug": "latent-heat"
              },
              {
                "name": "Heating and Cooling Curves",
                "slug": "heating-cooling-curve"
              },
              {
                "name": "Change of State — Melting, Boiling, Sublimation",
                "slug": "change-of-state"
              }
            ]
          },
          {
            "name": "Thermodynamics",
            "slug": "thermodynamics",
            "topics": [
              {
                "name": "Thermodynamic System — Types and State Variables",
                "slug": "system-state-variables"
              },
              {
                "name": "Zeroth Law and Thermal Equilibrium",
                "slug": "zeroth-law"
              },
              {
                "name": "Internal Energy",
                "slug": "internal-energy"
              },
              {
                "name": "First Law — ΔU = Q - W (Both Sign Conventions)",
                "slug": "first-law"
              },
              {
                "name": "Work Done by Gas — PV Diagram Analysis",
                "slug": "work-pv-diagram"
              },
              {
                "name": "Isothermal Process",
                "slug": "isothermal"
              },
              {
                "name": "Adiabatic Process — γ, Relations and Equations",
                "slug": "adiabatic"
              },
              {
                "name": "Isochoric Process",
                "slug": "isochoric"
              },
              {
                "name": "Isobaric Process",
                "slug": "isobaric"
              },
              {
                "name": "Polytropic Process",
                "slug": "polytropic"
              }
            ]
          },
          {
            "name": "Kinetic Theory",
            "slug": "kinetic-theory",
            "topics": [
              {
                "name": "Molecular Nature of Matter",
                "slug": "molecular-nature"
              },
              {
                "name": "Assumptions of Kinetic Theory of Gases",
                "slug": "kinetic-assumptions"
              },
              {
                "name": "Pressure Exerted by an Ideal Gas",
                "slug": "pressure-ideal-gas"
              },
              {
                "name": "Kinetic Interpretation of Temperature",
                "slug": "temperature-kinetic"
              },
              {
                "name": "RMS Speed (vrms)",
                "slug": "rms-speed"
              },
              {
                "name": "Mean Speed (v̄)",
                "slug": "mean-speed"
              },
              {
                "name": "Most Probable Speed (vp)",
                "slug": "most-probable-speed"
              },
              {
                "name": "Ratio of Speeds — vp : v̄ : vrms",
                "slug": "speed-ratios"
              },
              {
                "name": "Maxwell's Distribution of Speeds",
                "slug": "maxwell-distribution"
              },
              {
                "name": "Degrees of Freedom",
                "slug": "degrees-of-freedom"
              }
            ]
          },
          {
            "name": "Oscillations",
            "slug": "oscillations",
            "topics": [
              {
                "name": "Periodic and Oscillatory Motion",
                "slug": "periodic-oscillatory"
              },
              {
                "name": "SHM — Definition and Examples",
                "slug": "shm-definition"
              },
              {
                "name": "SHM — Differential Equation (d²x/dt² = -ω²x)",
                "slug": "shm-diff-equation"
              },
              {
                "name": "Displacement, Velocity and Acceleration in SHM",
                "slug": "shm-dva"
              },
              {
                "name": "Phase — Initial Phase and Phase Difference",
                "slug": "shm-phase"
              },
              {
                "name": "KE and PE in SHM",
                "slug": "ke-pe-shm"
              },
              {
                "name": "Total Energy in SHM (E = ½mω²A²)",
                "slug": "total-energy-shm"
              },
              {
                "name": "Spring-Mass System — T = 2π√(m/k)",
                "slug": "spring-mass-system"
              },
              {
                "name": "Springs in Series and Parallel",
                "slug": "springs-combinations"
              },
              {
                "name": "Simple Pendulum — T = 2π√(L/g)",
                "slug": "simple-pendulum"
              }
            ]
          },
          {
            "name": "Waves",
            "slug": "waves",
            "topics": [
              {
                "name": "Transverse and Longitudinal Waves",
                "slug": "transverse-longitudinal"
              },
              {
                "name": "Wave Parameters — Amplitude, Wavelength, Frequency, Period",
                "slug": "wave-parameters"
              },
              {
                "name": "Wave Equation — y = A sin(kx - ωt)",
                "slug": "wave-equation"
              },
              {
                "name": "Speed of Transverse Wave in String (v = √T/μ)",
                "slug": "speed-string"
              },
              {
                "name": "Speed of Longitudinal Wave in Medium",
                "slug": "speed-longitudinal"
              },
              {
                "name": "Speed of Sound — Newton and Laplace Formula",
                "slug": "speed-sound"
              },
              {
                "name": "Intensity of Wave (I ∝ A²)",
                "slug": "wave-intensity"
              },
              {
                "name": "Principle of Superposition of Waves",
                "slug": "superposition"
              },
              {
                "name": "Reflection at Fixed End (Phase Change) and Free End",
                "slug": "wave-reflection"
              },
              {
                "name": "Standing Waves — Condition and Formation",
                "slug": "standing-waves"
              }
            ]
          },
          {
            "name": "Electric Charges and Fields",
            "slug": "electric-charges-fields",
            "topics": [
              {
                "name": "Electric Charge — Properties and Conservation",
                "slug": "charge-properties"
              },
              {
                "name": "Conductors, Insulators and Semiconductors",
                "slug": "conductors-insulators"
              },
              {
                "name": "Methods of Charging — Friction, Conduction, Induction",
                "slug": "charging-methods"
              },
              {
                "name": "Coulomb's Law in Free Space and Medium",
                "slug": "coulombs-law"
              },
              {
                "name": "Superposition Principle for Multiple Charges",
                "slug": "superposition-principle"
              },
              {
                "name": "Electric Field — Definition and Formula",
                "slug": "electric-field-def"
              },
              {
                "name": "Electric Field due to Point Charge",
                "slug": "field-point-charge"
              },
              {
                "name": "Electric Field Lines — Properties",
                "slug": "field-lines"
              },
              {
                "name": "Electric Dipole — Definition and Dipole Moment",
                "slug": "electric-dipole"
              },
              {
                "name": "Field on Axial Line of Dipole",
                "slug": "field-axial-dipole"
              }
            ]
          },
          {
            "name": "Electrostatic Potential and Capacitance",
            "slug": "electrostatic-potential-capacitance",
            "topics": [
              {
                "name": "Electric Potential — Definition, Unit and Formula",
                "slug": "potential-definition"
              },
              {
                "name": "Relation Between E and V (E = -dV/dr)",
                "slug": "e-v-relation"
              },
              {
                "name": "Potential due to Point Charge",
                "slug": "potential-point"
              },
              {
                "name": "Potential due to Electric Dipole — Axial and Equatorial",
                "slug": "potential-dipole"
              },
              {
                "name": "Potential due to System of Charges",
                "slug": "potential-system"
              },
              {
                "name": "Equipotential Surfaces — Properties and Examples",
                "slug": "equipotential-surfaces"
              },
              {
                "name": "Potential Energy of System of Charges",
                "slug": "pe-system-charges"
              },
              {
                "name": "Potential Energy of Dipole in External Field",
                "slug": "pe-dipole-field"
              },
              {
                "name": "Conductors in Electrostatic Equilibrium",
                "slug": "conductors-equilibrium"
              },
              {
                "name": "Dielectrics — Polar and Non-Polar",
                "slug": "dielectrics-types"
              }
            ]
          },
          {
            "name": "Current Electricity",
            "slug": "current-electricity",
            "topics": [
              {
                "name": "Electric Current and Conventional Current",
                "slug": "electric-current"
              },
              {
                "name": "Drift Velocity and Mobility",
                "slug": "drift-velocity-mobility"
              },
              {
                "name": "Relation Between Current and Drift Velocity",
                "slug": "current-drift-relation"
              },
              {
                "name": "Ohm's Law — Statement and Limitations",
                "slug": "ohms-law"
              },
              {
                "name": "Resistance — Definition, Resistivity and Conductivity",
                "slug": "resistance-resistivity"
              },
              {
                "name": "Variation of Resistance with Temperature — α",
                "slug": "resistance-temperature"
              },
              {
                "name": "Colour Code for Resistors",
                "slug": "colour-code"
              },
              {
                "name": "Resistors in Series",
                "slug": "resistors-series"
              },
              {
                "name": "Resistors in Parallel",
                "slug": "resistors-parallel"
              },
              {
                "name": "Kirchhoff's Current Law (KCL / Junction Rule)",
                "slug": "kcl"
              }
            ]
          },
          {
            "name": "Moving Charges and Magnetism",
            "slug": "moving-charges-magnetism",
            "topics": [
              {
                "name": "Magnetic Field — Concept, Biot-Savart Law",
                "slug": "biot-savart-law"
              },
              {
                "name": "Magnetic Field due to Straight Finite and Infinite Wire",
                "slug": "field-wire"
              },
              {
                "name": "Magnetic Field on Axis of Circular Current Loop",
                "slug": "field-circular-loop"
              },
              {
                "name": "Ampere's Circuital Law",
                "slug": "amperes-law"
              },
              {
                "name": "Magnetic Field Inside Solenoid",
                "slug": "field-solenoid"
              },
              {
                "name": "Magnetic Field of Toroid",
                "slug": "field-toroid"
              },
              {
                "name": "Force on Moving Charge in Magnetic Field (F = qv × B)",
                "slug": "force-charge"
              },
              {
                "name": "Motion of Charged Particle — Circle, Helix",
                "slug": "particle-motion"
              },
              {
                "name": "Cyclotron — Principle, Working and Limitations",
                "slug": "cyclotron"
              },
              {
                "name": "Force on Current-Carrying Conductor in B",
                "slug": "force-conductor"
              }
            ]
          },
          {
            "name": "Magnetism and Matter",
            "slug": "magnetism-matter",
            "topics": [
              {
                "name": "Bar Magnet — Properties and Pole Strength",
                "slug": "bar-magnet"
              },
              {
                "name": "Axial Field of Bar Magnet",
                "slug": "magnet-axial-field"
              },
              {
                "name": "Equatorial Field of Bar Magnet",
                "slug": "magnet-equatorial-field"
              },
              {
                "name": "Torque on Magnetic Dipole in Uniform B",
                "slug": "magnet-torque"
              },
              {
                "name": "Potential Energy of Dipole in B",
                "slug": "dipole-pe"
              },
              {
                "name": "Gauss's Law for Magnetism",
                "slug": "gauss-magnetism"
              },
              {
                "name": "Bar Magnet as Equivalent Solenoid",
                "slug": "magnet-solenoid-equiv"
              },
              {
                "name": "Earth's Magnetic Field — Components (BH, BV, δ, I)",
                "slug": "earth-field-components"
              },
              {
                "name": "Magnetic Properties — I, H, χ, μ",
                "slug": "magnetic-properties"
              },
              {
                "name": "Diamagnetic Materials",
                "slug": "diamagnetic"
              }
            ]
          },
          {
            "name": "Electromagnetic Induction",
            "slug": "em-induction",
            "topics": [
              {
                "name": "Magnetic Flux (Φ = B·A cosθ)",
                "slug": "magnetic-flux"
              },
              {
                "name": "Faraday's First and Second Laws of Induction",
                "slug": "faradays-laws"
              },
              {
                "name": "Lenz's Law and Conservation of Energy",
                "slug": "lenzs-law"
              },
              {
                "name": "Motional EMF (ε = Bvl)",
                "slug": "motional-emf"
              },
              {
                "name": "EMF in Rotating Coil",
                "slug": "rotating-coil-emf"
              },
              {
                "name": "Eddy Currents — Causes, Effects and Uses",
                "slug": "eddy-currents"
              },
              {
                "name": "Self-Inductance (L) and Self-Induced EMF",
                "slug": "self-inductance"
              },
              {
                "name": "Self-Inductance of Solenoid (L = μ₀n²V)",
                "slug": "self-inductance-solenoid"
              },
              {
                "name": "Mutual Inductance (M) and Mutually Induced EMF",
                "slug": "mutual-inductance"
              },
              {
                "name": "Coefficient of Coupling",
                "slug": "coupling-coefficient"
              }
            ]
          },
          {
            "name": "Alternating Current",
            "slug": "alternating-current",
            "topics": [
              {
                "name": "AC Voltage — Amplitude, Angular Frequency, Phase",
                "slug": "ac-basics"
              },
              {
                "name": "Peak, RMS and Average Value",
                "slug": "ac-peak-rms-avg"
              },
              {
                "name": "AC through Pure Resistor",
                "slug": "ac-resistor"
              },
              {
                "name": "AC through Pure Inductor — Inductive Reactance (XL)",
                "slug": "ac-inductor"
              },
              {
                "name": "AC through Pure Capacitor — Capacitive Reactance (XC)",
                "slug": "ac-capacitor"
              },
              {
                "name": "Phasor Diagram — LR, RC and LC Circuits",
                "slug": "phasor-diagrams"
              },
              {
                "name": "Series RLC Circuit — Impedance Z",
                "slug": "series-rlc-impedance"
              },
              {
                "name": "Resonance in Series RLC — f₀ = 1/(2π√LC)",
                "slug": "series-resonance"
              },
              {
                "name": "Bandwidth and Quality Factor (Q)",
                "slug": "bandwidth-q-factor"
              },
              {
                "name": "Power in AC — Apparent, Real and Reactive Power",
                "slug": "power-ac-types"
              }
            ]
          },
          {
            "name": "Electromagnetic Waves",
            "slug": "em-waves",
            "topics": [
              {
                "name": "Need for Displacement Current — Limitation of Ampere's Law",
                "slug": "displacement-current-need"
              },
              {
                "name": "Displacement Current (Id = ε₀ dΦE/dt)",
                "slug": "displacement-current"
              },
              {
                "name": "Maxwell's Equations (Qualitative)",
                "slug": "maxwells-equations"
              },
              {
                "name": "EM Wave — Transverse Nature and Properties",
                "slug": "em-wave-properties"
              },
              {
                "name": "Speed of EM Waves (c = 1/√μ₀ε₀)",
                "slug": "em-wave-speed"
              },
              {
                "name": "Energy, Intensity and Momentum of EM Waves",
                "slug": "em-energy-momentum"
              },
              {
                "name": "EM Spectrum — Gamma, X-ray, UV, Visible, IR, Microwave, Radio",
                "slug": "em-spectrum-regions"
              },
              {
                "name": "Wavelength Range and Applications of Each Region",
                "slug": "em-spectrum-applications"
              }
            ]
          },
          {
            "name": "Ray Optics and Optical Instruments",
            "slug": "ray-optics",
            "topics": [
              {
                "name": "Reflection at Plane Mirror — Image Properties",
                "slug": "plane-mirror-image"
              },
              {
                "name": "Reflection at Spherical Mirror — Sign Convention",
                "slug": "spherical-mirror-convention"
              },
              {
                "name": "Mirror Formula (1/v + 1/u = 1/f)",
                "slug": "mirror-formula"
              },
              {
                "name": "Magnification by Spherical Mirror",
                "slug": "mirror-magnification"
              },
              {
                "name": "Refraction — Snell's Law",
                "slug": "snells-law"
              },
              {
                "name": "Refractive Index — Absolute and Relative",
                "slug": "refractive-index"
              },
              {
                "name": "Total Internal Reflection and Critical Angle",
                "slug": "tir-critical-angle"
              },
              {
                "name": "Applications of TIR — Optical Fibre, Diamond, Mirage",
                "slug": "tir-applications"
              },
              {
                "name": "Refraction at Spherical Surfaces",
                "slug": "refraction-spherical"
              },
              {
                "name": "Thin Lens Formula (1/v - 1/u = 1/f)",
                "slug": "thin-lens-formula"
              }
            ]
          },
          {
            "name": "Wave Optics",
            "slug": "wave-optics",
            "topics": [
              {
                "name": "Huygens' Principle",
                "slug": "huygens-principle"
              },
              {
                "name": "Coherent Sources",
                "slug": "coherent-sources"
              },
              {
                "name": "Young's Double Slit Experiment (YDSE) — Setup",
                "slug": "ydse-setup"
              },
              {
                "name": "Fringe Width β = λD/d",
                "slug": "fringe-width"
              },
              {
                "name": "Conditions for Bright and Dark Fringes",
                "slug": "bright-dark-fringes"
              },
              {
                "name": "Intensity Distribution in YDSE",
                "slug": "ydse-intensity"
              },
              {
                "name": "Effect of Thin Film in YDSE Path",
                "slug": "ydse-thin-film"
              },
              {
                "name": "Diffraction at Single Slit",
                "slug": "single-slit-diffraction"
              },
              {
                "name": "Width of Central Maximum (2λD/d)",
                "slug": "central-max-width"
              },
              {
                "name": "Resolving Power of Microscope and Telescope",
                "slug": "resolving-power"
              }
            ]
          },
          {
            "name": "Dual Nature of Radiation and Matter",
            "slug": "dual-nature",
            "topics": [
              {
                "name": "Photoelectric Effect — Discovery and Observations",
                "slug": "pe-discovery"
              },
              {
                "name": "Effect of Intensity, Frequency and Potential",
                "slug": "pe-effects"
              },
              {
                "name": "Failure of Classical Wave Theory",
                "slug": "wave-theory-failure"
              },
              {
                "name": "Einstein's Photoelectric Equation (Kmax = hν - φ)",
                "slug": "einsteins-equation"
              },
              {
                "name": "Work Function and Threshold Frequency",
                "slug": "work-function"
              },
              {
                "name": "Stopping Potential and Its Significance",
                "slug": "stopping-potential"
              },
              {
                "name": "de Broglie's Hypothesis (λ = h/mv)",
                "slug": "de-broglie-hypothesis"
              },
              {
                "name": "de Broglie Wavelength of Electron (λ = h/√2mK)",
                "slug": "de-broglie-electron"
              },
              {
                "name": "Davisson-Germer Experiment",
                "slug": "davisson-germer"
              },
              {
                "name": "Heisenberg's Uncertainty Principle (Δx·Δp ≥ h/4π)",
                "slug": "uncertainty-principle"
              }
            ]
          },
          {
            "name": "Atoms",
            "slug": "atoms",
            "topics": [
              {
                "name": "Thomson's Model and Its Failure",
                "slug": "thomson-model"
              },
              {
                "name": "Rutherford's α-Scattering Experiment",
                "slug": "alpha-scattering"
              },
              {
                "name": "Rutherford's Nuclear Model and Limitations",
                "slug": "rutherford-model"
              },
              {
                "name": "Bohr's Postulates",
                "slug": "bohr-postulates"
              },
              {
                "name": "Bohr's Radii (rn = n²a₀)",
                "slug": "bohr-radii"
              },
              {
                "name": "Bohr's Velocities (vn = v₀/n)",
                "slug": "bohr-velocities"
              },
              {
                "name": "Bohr's Energy Levels (En = -13.6/n² eV)",
                "slug": "bohr-energy-levels"
              },
              {
                "name": "Emission and Absorption Spectra",
                "slug": "emission-absorption"
              },
              {
                "name": "Hydrogen Spectral Series — Lyman, Balmer, Paschen, Brackett, Pfund",
                "slug": "spectral-series"
              },
              {
                "name": "Excitation Energy and Ionisation Energy",
                "slug": "excitation-ionisation"
              }
            ]
          },
          {
            "name": "Nuclei",
            "slug": "nuclei",
            "topics": [
              {
                "name": "Composition of Nucleus — Protons and Neutrons",
                "slug": "nucleus-composition"
              },
              {
                "name": "Atomic Mass Unit (amu) and Energy Equivalent",
                "slug": "amu-energy"
              },
              {
                "name": "Nuclear Size — R = R₀A^(1/3)",
                "slug": "nuclear-size"
              },
              {
                "name": "Nuclear Density",
                "slug": "nuclear-density"
              },
              {
                "name": "Mass Defect (Δm)",
                "slug": "mass-defect"
              },
              {
                "name": "Binding Energy (ΔmC²)",
                "slug": "binding-energy"
              },
              {
                "name": "Binding Energy per Nucleon — Graph and Significance",
                "slug": "be-nucleon-graph"
              },
              {
                "name": "Radioactivity — Discovery and Properties",
                "slug": "radioactivity"
              },
              {
                "name": "Alpha Decay — Equation and Q-Value",
                "slug": "alpha-decay"
              },
              {
                "name": "Beta Decay (β⁻ and β⁺) — Neutrino",
                "slug": "beta-decay"
              }
            ]
          },
          {
            "name": "Semiconductor Electronics: Materials, Devices and Simple Circuits",
            "slug": "semiconductor-electronics",
            "topics": [
              {
                "name": "Energy Bands — Valence, Conduction, Band Gap",
                "slug": "energy-bands"
              },
              {
                "name": "Classification — Metals, Semiconductors, Insulators",
                "slug": "band-classification"
              },
              {
                "name": "Intrinsic Semiconductor — Electron-Hole Pair",
                "slug": "intrinsic-semiconductor"
              },
              {
                "name": "Extrinsic — n-Type Semiconductor (Donor Impurity)",
                "slug": "n-type"
              },
              {
                "name": "Extrinsic — p-Type Semiconductor (Acceptor Impurity)",
                "slug": "p-type"
              },
              {
                "name": "p-n Junction Formation and Depletion Layer",
                "slug": "pn-junction"
              },
              {
                "name": "Potential Barrier",
                "slug": "potential-barrier"
              },
              {
                "name": "Forward Bias and Reverse Bias",
                "slug": "forward-reverse-bias"
              },
              {
                "name": "I-V Characteristics of p-n Junction Diode",
                "slug": "diode-iv-char"
              },
              {
                "name": "Half-Wave Rectifier",
                "slug": "half-wave-rectifier"
              }
            ]
          }
        ]
      },
      {
        "name": "Chemistry",
        "slug": "chemistry",
        "chapters": [
          {
            "name": "Some Basic Concepts of Chemistry",
            "slug": "basic-concepts",
            "topics": [
              {
                "name": "Importance and Nature of Chemistry",
                "slug": "importance-chemistry"
              },
              {
                "name": "Laws of Chemical Combination",
                "slug": "laws-combination"
              },
              {
                "name": "Dalton's Atomic Theory",
                "slug": "daltons-theory"
              },
              {
                "name": "Atomic Mass and Molecular Mass",
                "slug": "atomic-molecular-mass"
              },
              {
                "name": "Mole Concept and Avogadro's Number",
                "slug": "mole-avogadro"
              },
              {
                "name": "Molar Mass",
                "slug": "molar-mass"
              },
              {
                "name": "Percentage Composition",
                "slug": "percentage-composition"
              },
              {
                "name": "Empirical Formula from Percentage Composition",
                "slug": "empirical-from-percent"
              },
              {
                "name": "Molecular Formula from Empirical Formula",
                "slug": "molecular-from-empirical"
              },
              {
                "name": "Stoichiometry and Mole-Mole Relationship",
                "slug": "stoichiometry"
              }
            ]
          },
          {
            "name": "Structure of Atom",
            "slug": "structure-of-atom",
            "topics": [
              {
                "name": "Discovery of Electron — Cathode Ray Experiment",
                "slug": "discovery-electron"
              },
              {
                "name": "Charge-to-Mass Ratio of Electron",
                "slug": "e-m-ratio"
              },
              {
                "name": "Millikan's Oil Drop Experiment — Charge of Electron",
                "slug": "millikan-experiment"
              },
              {
                "name": "Discovery of Proton and Neutron",
                "slug": "proton-neutron"
              },
              {
                "name": "Thomson's Plum Pudding Model",
                "slug": "thomson-model-chem"
              },
              {
                "name": "Rutherford's α-Scattering and Nuclear Model",
                "slug": "rutherford-chem"
              },
              {
                "name": "Atomic Number, Mass Number, Isotopes and Isobars",
                "slug": "atomic-number-isotopes"
              },
              {
                "name": "Electromagnetic Radiation — Wave Nature",
                "slug": "em-radiation-wave"
              },
              {
                "name": "Planck's Quantum Theory and Energy of Photon",
                "slug": "planck-theory"
              },
              {
                "name": "Photoelectric Effect",
                "slug": "photoelectric-chem"
              }
            ]
          },
          {
            "name": "Classification of Elements and Periodicity in Properties",
            "slug": "periodic-table",
            "topics": [
              {
                "name": "History — Döbereiner's Triads, Newlands' Law of Octaves",
                "slug": "history-triads-octaves"
              },
              {
                "name": "Mendeleev's Periodic Table and Its Limitations",
                "slug": "mendeleev-table"
              },
              {
                "name": "Modern Periodic Law and Long Form of Table",
                "slug": "modern-table"
              },
              {
                "name": "s, p, d, f Block Classification",
                "slug": "block-classification"
              },
              {
                "name": "Atomic Radius — Covalent, Metallic, Van der Waals",
                "slug": "atomic-radius-types"
              },
              {
                "name": "Trend of Atomic Radius in Period (Decreases)",
                "slug": "atomic-radius-period"
              },
              {
                "name": "Trend of Atomic Radius in Group (Increases)",
                "slug": "atomic-radius-group"
              },
              {
                "name": "Ionic Radius and Isoelectronic Species",
                "slug": "ionic-radius"
              },
              {
                "name": "Ionisation Enthalpy — Definition",
                "slug": "ie-def"
              },
              {
                "name": "Trends of IE in Period and Group",
                "slug": "ie-trends"
              }
            ]
          },
          {
            "name": "Chemical Bonding and Molecular Structure",
            "slug": "chemical-bonding",
            "topics": [
              {
                "name": "Kossel-Lewis Approach — Octet Rule",
                "slug": "octet-rule"
              },
              {
                "name": "Lewis Dot Structures",
                "slug": "lewis-dot"
              },
              {
                "name": "Exceptions to Octet Rule",
                "slug": "octet-exceptions"
              },
              {
                "name": "Formal Charge Calculation",
                "slug": "formal-charge"
              },
              {
                "name": "Ionic Bond — Formation and Conditions",
                "slug": "ionic-bond"
              },
              {
                "name": "Lattice Enthalpy and Born-Haber Cycle",
                "slug": "lattice-born-haber"
              },
              {
                "name": "Covalent Bond — σ and π Bonds",
                "slug": "sigma-pi-bonds"
              },
              {
                "name": "Bond Parameters — Length, Energy, Angle, Order",
                "slug": "bond-parameters"
              },
              {
                "name": "Polar Covalent Bond and Dipole Moment",
                "slug": "polar-dipole"
              },
              {
                "name": "Resonance Structures and Resonance Energy",
                "slug": "resonance"
              }
            ]
          },
          {
            "name": "States of Matter",
            "slug": "states-of-matter",
            "topics": [
              {
                "name": "Intermolecular Forces and Effect on State",
                "slug": "intermolecular-forces"
              },
              {
                "name": "Boyle's Law",
                "slug": "boyles-law"
              },
              {
                "name": "Charles's Law",
                "slug": "charless-law"
              },
              {
                "name": "Gay-Lussac's Law",
                "slug": "gay-lussac-law"
              },
              {
                "name": "Avogadro's Law and Molar Volume at STP",
                "slug": "avogadros-law"
              },
              {
                "name": "Ideal Gas Equation (PV = nRT)",
                "slug": "ideal-gas-eq"
              },
              {
                "name": "Dalton's Law of Partial Pressure",
                "slug": "daltons-partial-pressure"
              },
              {
                "name": "Kinetic Molecular Theory of Gases",
                "slug": "kmt"
              },
              {
                "name": "Molecular Speed Distribution — Maxwell",
                "slug": "maxwell-speed"
              },
              {
                "name": "RMS, Mean and Most Probable Speed",
                "slug": "speed-types"
              }
            ]
          },
          {
            "name": "Thermodynamics",
            "slug": "thermodynamics-chem",
            "topics": [
              {
                "name": "System, Surroundings — Open, Closed, Isolated",
                "slug": "system-types"
              },
              {
                "name": "Thermodynamic State Functions",
                "slug": "state-functions"
              },
              {
                "name": "Extensive and Intensive Properties",
                "slug": "extensive-intensive"
              },
              {
                "name": "Isothermal, Adiabatic, Isochoric, Isobaric Processes",
                "slug": "thermo-processes"
              },
              {
                "name": "Heat (q) and Work (w) — Sign Conventions",
                "slug": "heat-work-signs"
              },
              {
                "name": "First Law — ΔU = q + w",
                "slug": "first-law-chem"
              },
              {
                "name": "Enthalpy (H = U + pV)",
                "slug": "enthalpy"
              },
              {
                "name": "ΔH = ΔU + ΔngRT",
                "slug": "dh-du-relation"
              },
              {
                "name": "Standard Enthalpy of Formation (ΔfH°)",
                "slug": "standard-formation"
              },
              {
                "name": "Hess's Law of Constant Heat Summation",
                "slug": "hesss-law"
              }
            ]
          },
          {
            "name": "Equilibrium",
            "slug": "equilibrium",
            "topics": [
              {
                "name": "Physical and Chemical Equilibrium",
                "slug": "physical-chemical-eq"
              },
              {
                "name": "Law of Mass Action",
                "slug": "law-mass-action"
              },
              {
                "name": "Kc — Expression and Units",
                "slug": "kc-expression"
              },
              {
                "name": "Kp — Expression and Units",
                "slug": "kp-expression"
              },
              {
                "name": "Relation Between Kc and Kp (Kp = Kc(RT)^Δn)",
                "slug": "kc-kp-relation"
              },
              {
                "name": "Homogeneous and Heterogeneous Equilibrium",
                "slug": "homo-heterogeneous-eq"
              },
              {
                "name": "Characteristics of Equilibrium Constant",
                "slug": "k-characteristics"
              },
              {
                "name": "Reaction Quotient (Qc) and Direction of Reaction",
                "slug": "reaction-quotient"
              },
              {
                "name": "Le Chatelier's Principle",
                "slug": "le-chateliers"
              },
              {
                "name": "Effect of Concentration, Pressure, Temperature on K",
                "slug": "equilibrium-effects"
              }
            ]
          },
          {
            "name": "Redox Reactions",
            "slug": "redox-reactions",
            "topics": [
              {
                "name": "Oxidation and Reduction — Electronic Concept",
                "slug": "oxidation-reduction-def"
              },
              {
                "name": "Oxidation Number — Rules and Calculation",
                "slug": "oxidation-number-rules"
              },
              {
                "name": "Oxidising and Reducing Agents",
                "slug": "oxidising-reducing"
              },
              {
                "name": "Balancing by Oxidation Number Method",
                "slug": "ox-number-balancing"
              },
              {
                "name": "Half-Reaction Method — Acidic Medium",
                "slug": "half-reaction-acidic"
              },
              {
                "name": "Half-Reaction Method — Basic Medium",
                "slug": "half-reaction-basic"
              },
              {
                "name": "Types — Combination, Decomposition, Displacement, Disproportionation",
                "slug": "redox-types"
              },
              {
                "name": "Electrochemical Series and Standard Reduction Potential",
                "slug": "electrochemical-series"
              }
            ]
          },
          {
            "name": "Hydrogen",
            "slug": "hydrogen",
            "topics": [
              {
                "name": "Position of Hydrogen — Unique Character",
                "slug": "hydrogen-unique"
              },
              {
                "name": "Isotopes — Protium, Deuterium (D₂O), Tritium",
                "slug": "hydrogen-isotopes"
              },
              {
                "name": "Preparation of Hydrogen — Laboratory Methods",
                "slug": "hydrogen-lab-prep"
              },
              {
                "name": "Industrial Preparation — Steam Reforming",
                "slug": "hydrogen-industrial"
              },
              {
                "name": "Properties of Molecular Hydrogen",
                "slug": "hydrogen-properties"
              },
              {
                "name": "Hydrides — Ionic, Covalent, Metallic",
                "slug": "hydrides-types"
              },
              {
                "name": "Water — Structure and Unique Properties",
                "slug": "water-structure"
              },
              {
                "name": "Anomalous Expansion of Water",
                "slug": "water-anomalous"
              },
              {
                "name": "Hard Water — Temporary and Permanent",
                "slug": "hard-water"
              },
              {
                "name": "Removal of Hardness",
                "slug": "hardness-removal"
              }
            ]
          },
          {
            "name": "The s-Block Elements",
            "slug": "s-block",
            "topics": [
              {
                "name": "General Characteristics — Electronic Configuration, Properties",
                "slug": "s-block-general"
              },
              {
                "name": "Alkali Metals — Physical Properties and Trends",
                "slug": "alkali-physical"
              },
              {
                "name": "Alkali Metals — Chemical Properties",
                "slug": "alkali-chemical"
              },
              {
                "name": "Anomalous Behaviour of Lithium",
                "slug": "li-anomalous"
              },
              {
                "name": "Diagonal Relationship — Li and Mg",
                "slug": "li-mg-diagonal"
              },
              {
                "name": "NaOH — Preparation (Castner-Kellner) and Properties",
                "slug": "naoh"
              },
              {
                "name": "Na₂CO₃ — Solvay Process and Properties",
                "slug": "na2co3"
              },
              {
                "name": "NaHCO₃ and NaCl",
                "slug": "nahco3-nacl"
              },
              {
                "name": "Alkaline Earth Metals — Physical Properties",
                "slug": "ae-physical"
              },
              {
                "name": "Alkaline Earth Metals — Chemical Properties",
                "slug": "ae-chemical"
              }
            ]
          },
          {
            "name": "The p-Block Elements (Groups 13 and 14)",
            "slug": "p-block-11",
            "topics": [
              {
                "name": "Group 13 — General Properties and Trends",
                "slug": "group13-general"
              },
              {
                "name": "Boron — Allotropes, Structure and Properties",
                "slug": "boron-properties"
              },
              {
                "name": "Borax (Na₂B₄O₇) — Structure and Reactions",
                "slug": "borax"
              },
              {
                "name": "Boric Acid — Structure and Reactions",
                "slug": "boric-acid"
              },
              {
                "name": "Diborane — Structure and Preparation",
                "slug": "diborane"
              },
              {
                "name": "Aluminium — Properties and Reactions",
                "slug": "aluminium"
              },
              {
                "name": "Alums",
                "slug": "alums"
              },
              {
                "name": "Group 14 — General Properties and Trends",
                "slug": "group14-general"
              },
              {
                "name": "Catenation and Allotropy of Carbon",
                "slug": "catenation-allotropy"
              },
              {
                "name": "Diamond — Structure and Properties",
                "slug": "diamond"
              }
            ]
          },
          {
            "name": "Organic Chemistry: Some Basic Principles and Techniques",
            "slug": "organic-basics",
            "topics": [
              {
                "name": "Tetravalency of Carbon — Catenation",
                "slug": "tetravalency"
              },
              {
                "name": "Classification — Acyclic, Cyclic, Aromatic, Heterocyclic",
                "slug": "classification-organic"
              },
              {
                "name": "Functional Groups",
                "slug": "functional-groups"
              },
              {
                "name": "IUPAC Nomenclature — Alkanes",
                "slug": "iupac-alkanes"
              },
              {
                "name": "IUPAC Nomenclature — Alkenes and Alkynes",
                "slug": "iupac-alkenes-alkynes"
              },
              {
                "name": "IUPAC Nomenclature — Functional Group Compounds",
                "slug": "iupac-functional-groups"
              },
              {
                "name": "Chain, Position and Functional Group Isomerism",
                "slug": "structural-isomerism-types"
              },
              {
                "name": "Optical Isomerism — Chirality and Enantiomers",
                "slug": "optical-isomerism"
              },
              {
                "name": "R and S Configuration",
                "slug": "r-s-configuration"
              },
              {
                "name": "Geometrical Isomerism — cis-trans",
                "slug": "cis-trans-isomerism"
              }
            ]
          },
          {
            "name": "Hydrocarbons",
            "slug": "hydrocarbons",
            "topics": [
              {
                "name": "Alkanes — IUPAC Nomenclature and Isomers",
                "slug": "alkanes-nomenclature"
              },
              {
                "name": "Alkanes — Preparation",
                "slug": "alkanes-prep"
              },
              {
                "name": "Alkanes — Physical Properties",
                "slug": "alkanes-physical"
              },
              {
                "name": "Free Radical Halogenation — Mechanism and Selectivity",
                "slug": "free-radical-halogenation"
              },
              {
                "name": "Alkanes — Combustion",
                "slug": "alkanes-combustion"
              },
              {
                "name": "Alkenes — IUPAC and Structural Isomers",
                "slug": "alkenes-nomenclature"
              },
              {
                "name": "Alkenes — Preparation (Dehydration, Dehydrohalogenation)",
                "slug": "alkenes-prep"
              },
              {
                "name": "Mechanism of Electrophilic Addition",
                "slug": "eas-mechanism-alkenes"
              },
              {
                "name": "Markovnikov's Rule",
                "slug": "markovnikov-rule"
              },
              {
                "name": "Anti-Markovnikov (Peroxide Effect / HBr only)",
                "slug": "anti-markovnikov"
              }
            ]
          },
          {
            "name": "Environmental Chemistry",
            "slug": "environmental-chemistry",
            "topics": [
              {
                "name": "Troposphere, Stratosphere, Mesosphere, Thermosphere",
                "slug": "atmospheric-layers"
              },
              {
                "name": "Tropospheric Pollution — Gaseous Pollutants",
                "slug": "gaseous-pollutants"
              },
              {
                "name": "Particulate Pollutants",
                "slug": "particulate-pollutants"
              },
              {
                "name": "Smog — Classical and Photochemical",
                "slug": "smog-types"
              },
              {
                "name": "Acid Rain — Formation and Effects on Ecosystem",
                "slug": "acid-rain"
              },
              {
                "name": "Greenhouse Effect and Global Warming",
                "slug": "greenhouse-global-warming"
              },
              {
                "name": "Ozone Layer — Formation and Depletion (CFCs)",
                "slug": "ozone-layer-depletion"
              },
              {
                "name": "Water Pollution — Industrial, Domestic, Agricultural",
                "slug": "water-pollution-sources"
              },
              {
                "name": "BOD and COD",
                "slug": "bod-cod"
              },
              {
                "name": "Water Treatment",
                "slug": "water-treatment"
              }
            ]
          },
          {
            "name": "The Solid State",
            "slug": "solid-state",
            "topics": [
              {
                "name": "Crystalline vs Amorphous Solids",
                "slug": "crystalline-amorphous"
              },
              {
                "name": "Types of Solids — Ionic, Molecular, Covalent, Metallic",
                "slug": "solid-types"
              },
              {
                "name": "Crystal Lattice and Unit Cell",
                "slug": "crystal-lattice"
              },
              {
                "name": "Primitive (SCC), BCC and FCC Unit Cells",
                "slug": "unit-cell-types"
              },
              {
                "name": "Number of Atoms per Unit Cell",
                "slug": "atoms-per-cell"
              },
              {
                "name": "Packing Efficiency — SCC (52.4%), BCC (68%), FCC (74%)",
                "slug": "packing-efficiency"
              },
              {
                "name": "Tetrahedral and Octahedral Voids",
                "slug": "voids-types"
              },
              {
                "name": "Close Packing in 2D and 3D — HCP and CCP",
                "slug": "close-packing"
              },
              {
                "name": "Density Calculation from Unit Cell",
                "slug": "density-calculation"
              },
              {
                "name": "Structures — NaCl, ZnS (Zinc Blende and Wurtzite), CsCl, Diamond",
                "slug": "ionic-structures"
              }
            ]
          },
          {
            "name": "Solutions",
            "slug": "solutions",
            "topics": [
              {
                "name": "Types of Solutions — Solid, Liquid, Gas",
                "slug": "solution-types"
              },
              {
                "name": "Solubility of Solid in Liquid",
                "slug": "solubility-solid"
              },
              {
                "name": "Henry's Law for Gas Solubility",
                "slug": "henrys-law"
              },
              {
                "name": "Concentration Terms — Molarity, Molality, Mole Fraction, % w/v, ppm",
                "slug": "concentration-terms"
              },
              {
                "name": "Interconversion of Concentration Terms",
                "slug": "concentration-interconversion"
              },
              {
                "name": "Vapour Pressure and Raoult's Law",
                "slug": "raoults-law"
              },
              {
                "name": "Raoult's Law for Volatile-Volatile Mixtures",
                "slug": "raoult-volatile-mix"
              },
              {
                "name": "Ideal and Non-Ideal Solutions",
                "slug": "ideal-nonideal"
              },
              {
                "name": "Positive Deviation (PA > PA° xA)",
                "slug": "positive-deviation"
              },
              {
                "name": "Negative Deviation",
                "slug": "negative-deviation"
              }
            ]
          },
          {
            "name": "Electrochemistry",
            "slug": "electrochemistry",
            "topics": [
              {
                "name": "Electrochemical Cell — Galvanic vs Electrolytic",
                "slug": "cell-types"
              },
              {
                "name": "Daniel Cell — Working and Cell Reaction",
                "slug": "daniel-cell"
              },
              {
                "name": "Cell Notation and Salt Bridge Function",
                "slug": "cell-notation"
              },
              {
                "name": "Standard Electrode Potential (E° at SHE)",
                "slug": "standard-electrode"
              },
              {
                "name": "Cell Potential (E°cell = E°cathode - E°anode)",
                "slug": "cell-potential"
              },
              {
                "name": "Electrochemical Series and Applications",
                "slug": "electrochemical-series"
              },
              {
                "name": "Nernst Equation",
                "slug": "nernst-equation"
              },
              {
                "name": "Equilibrium Constant from E°cell (lnK = nFE°/RT)",
                "slug": "k-from-ecell"
              },
              {
                "name": "Relationship ΔG° = -nFE°",
                "slug": "delta-g-ecell"
              },
              {
                "name": "Electrolysis — Faraday's First Law",
                "slug": "faradays-first"
              }
            ]
          },
          {
            "name": "Chemical Kinetics",
            "slug": "chemical-kinetics",
            "topics": [
              {
                "name": "Rate of Reaction — Average and Instantaneous",
                "slug": "rate-of-reaction"
              },
              {
                "name": "Rate Expression and Rate Constant Units",
                "slug": "rate-expression-units"
              },
              {
                "name": "Factors Affecting Rate",
                "slug": "rate-factors"
              },
              {
                "name": "Rate Law (Rate = k[A]^m[B]^n)",
                "slug": "rate-law"
              },
              {
                "name": "Order of Reaction — Zero, First, Second",
                "slug": "order-types"
              },
              {
                "name": "Molecularity",
                "slug": "molecularity"
              },
              {
                "name": "Integrated Rate Law — Zero Order",
                "slug": "zero-order-integrated"
              },
              {
                "name": "Integrated Rate Law — First Order (k = (2.303/t)log(a/(a-x)))",
                "slug": "first-order-integrated"
              },
              {
                "name": "Half-Life — Zero Order (t₁/₂ = a/2k)",
                "slug": "half-life-zero"
              },
              {
                "name": "Half-Life — First Order (t₁/₂ = 0.693/k)",
                "slug": "half-life-first"
              }
            ]
          },
          {
            "name": "Surface Chemistry",
            "slug": "surface-chemistry",
            "topics": [
              {
                "name": "Adsorption — Physisorption vs Chemisorption",
                "slug": "adsorption-types"
              },
              {
                "name": "Freundlich Adsorption Isotherm",
                "slug": "freundlich-isotherm"
              },
              {
                "name": "Langmuir Adsorption Isotherm",
                "slug": "langmuir-isotherm"
              },
              {
                "name": "Factors Affecting Adsorption",
                "slug": "adsorption-factors"
              },
              {
                "name": "Homogeneous Catalysis",
                "slug": "homogeneous-catalysis"
              },
              {
                "name": "Heterogeneous Catalysis — Mechanism",
                "slug": "heterogeneous-catalysis"
              },
              {
                "name": "Enzyme Catalysis and Lock-Key Mechanism",
                "slug": "enzyme-catalysis"
              },
              {
                "name": "Zeolites",
                "slug": "zeolites"
              },
              {
                "name": "Colloid — Definition, Types and Classification",
                "slug": "colloid-types"
              },
              {
                "name": "Preparation of Colloids — Chemical, Bredig's Arc",
                "slug": "colloid-preparation"
              }
            ]
          },
          {
            "name": "General Principles and Processes of Isolation of Elements",
            "slug": "metallurgy",
            "topics": [
              {
                "name": "Minerals and Ores",
                "slug": "minerals-ores"
              },
              {
                "name": "Concentration — Gravity Separation, Froth Flotation",
                "slug": "concentration-methods"
              },
              {
                "name": "Electromagnetic Separation and Chemical Leaching",
                "slug": "electromagnetic-leaching"
              },
              {
                "name": "Calcination and Roasting",
                "slug": "calcination-roasting"
              },
              {
                "name": "Smelting and Carbon Reduction",
                "slug": "smelting-reduction"
              },
              {
                "name": "Thermodynamic Principles — Ellingham Diagram",
                "slug": "ellingham-diagram"
              },
              {
                "name": "Electrochemical Reduction",
                "slug": "electrochemical-reduction"
              },
              {
                "name": "Refining — Distillation, Liquation",
                "slug": "refining-distillation"
              },
              {
                "name": "Electrolytic Refining",
                "slug": "electrolytic-refining"
              },
              {
                "name": "Zone Refining",
                "slug": "zone-refining"
              }
            ]
          },
          {
            "name": "The p-Block Elements (Groups 15, 16, 17 and 18)",
            "slug": "p-block-12",
            "topics": [
              {
                "name": "Group 15 — General Properties",
                "slug": "group15-general"
              },
              {
                "name": "Nitrogen — Physical and Chemical Properties",
                "slug": "nitrogen-properties"
              },
              {
                "name": "Ammonia — Haber Process, Properties and Uses",
                "slug": "ammonia-haber"
              },
              {
                "name": "Nitric Acid — Ostwald Process, Properties",
                "slug": "nitric-acid-ostwald"
              },
              {
                "name": "Oxides of Nitrogen (N₂O to N₂O₅)",
                "slug": "nitrogen-oxides"
              },
              {
                "name": "Oxoacids of Nitrogen",
                "slug": "oxoacids-nitrogen"
              },
              {
                "name": "Phosphorus — Allotropes",
                "slug": "phosphorus-allotropes"
              },
              {
                "name": "Phosphine (PH₃) — Preparation and Properties",
                "slug": "phosphine"
              },
              {
                "name": "PCl₃ and PCl₅ — Structure and Properties",
                "slug": "pcl3-pcl5"
              },
              {
                "name": "Oxoacids of Phosphorus",
                "slug": "oxoacids-phosphorus"
              }
            ]
          },
          {
            "name": "The d- and f-Block Elements",
            "slug": "d-f-block",
            "topics": [
              {
                "name": "Position and Electronic Configuration",
                "slug": "transition-position"
              },
              {
                "name": "Metallic Character and Melting Point",
                "slug": "transition-metallic"
              },
              {
                "name": "Density and Atomic/Ionic Radius Trend",
                "slug": "transition-radius"
              },
              {
                "name": "Variable Oxidation States and Stability",
                "slug": "variable-oxidation"
              },
              {
                "name": "Ionisation Enthalpy of Transition Metals",
                "slug": "transition-ie"
              },
              {
                "name": "Colour of Transition Metal Compounds",
                "slug": "transition-colour"
              },
              {
                "name": "Magnetic Properties — Spin-Only Formula",
                "slug": "spin-only-formula"
              },
              {
                "name": "Catalytic Properties",
                "slug": "transition-catalysis"
              },
              {
                "name": "Interstitial Compounds",
                "slug": "interstitial-compounds"
              },
              {
                "name": "Alloy Formation",
                "slug": "alloy-formation"
              }
            ]
          },
          {
            "name": "Coordination Compounds",
            "slug": "coordination-compounds",
            "topics": [
              {
                "name": "Werner's Theory of Coordination",
                "slug": "werners-theory"
              },
              {
                "name": "Key Terms — Coordination Entity, Central Atom, Ligand, CN",
                "slug": "key-terms"
              },
              {
                "name": "Types of Ligands — Mono, Bi, Poly, Ambidentate, Chelate",
                "slug": "types-ligands"
              },
              {
                "name": "IUPAC Nomenclature Rules",
                "slug": "iupac-rules-coord"
              },
              {
                "name": "IUPAC Nomenclature — Worked Examples",
                "slug": "iupac-worked"
              },
              {
                "name": "Isomerism — Ionisation Isomerism",
                "slug": "ionisation-isomerism"
              },
              {
                "name": "Hydrate, Linkage, Coordination Isomerism",
                "slug": "hydrate-linkage-coord"
              },
              {
                "name": "Geometric Isomerism — Square Planar and Octahedral",
                "slug": "geometric-isomerism"
              },
              {
                "name": "Optical Isomerism in Coordination Compounds",
                "slug": "optical-isomerism-coord"
              },
              {
                "name": "Valence Bond Theory (VBT) — Inner and Outer Orbital",
                "slug": "vbt-inner-outer"
              }
            ]
          },
          {
            "name": "Haloalkanes and Haloarenes",
            "slug": "haloalkanes-haloarenes",
            "topics": [
              {
                "name": "Classification and IUPAC Nomenclature",
                "slug": "halo-classification-iupac"
              },
              {
                "name": "Nature of C-X Bond and Physical Properties",
                "slug": "cx-bond-properties"
              },
              {
                "name": "Preparation from Alcohols, Alkenes and Alkanes",
                "slug": "halo-preparation"
              },
              {
                "name": "SN1 Mechanism — Steps and Energy Profile",
                "slug": "sn1-mechanism"
              },
              {
                "name": "SN2 Mechanism — Steps and Stereochemistry",
                "slug": "sn2-mechanism"
              },
              {
                "name": "Factors — Substrate, Nucleophile, Solvent, Leaving Group",
                "slug": "sn-factors"
              },
              {
                "name": "Walden Inversion in SN2",
                "slug": "walden-inversion"
              },
              {
                "name": "E1 Elimination Mechanism",
                "slug": "e1-mechanism"
              },
              {
                "name": "E2 Elimination and Zaitsev's Rule",
                "slug": "e2-zaitsev"
              },
              {
                "name": "SN2 vs E2 Competition",
                "slug": "sn2-e2-competition"
              }
            ]
          },
          {
            "name": "Alcohols, Phenols and Ethers",
            "slug": "alcohols-phenols-ethers",
            "topics": [
              {
                "name": "Classification and IUPAC of Alcohols",
                "slug": "alcohol-classification-iupac"
              },
              {
                "name": "Preparation of Monohydric Alcohols",
                "slug": "alcohol-monohydric-prep"
              },
              {
                "name": "Preparation from Grignard Reagent",
                "slug": "grignard-prep"
              },
              {
                "name": "Physical Properties — Boiling Points, Hydrogen Bonding",
                "slug": "alcohol-physical"
              },
              {
                "name": "Chemical Reactions — Acidity of Alcohols",
                "slug": "alcohol-acidity"
              },
              {
                "name": "Esterification (Fischer-Speier)",
                "slug": "esterification"
              },
              {
                "name": "Dehydration — E1 and E2 Pathway",
                "slug": "dehydration"
              },
              {
                "name": "Lucas Test",
                "slug": "lucas-test"
              },
              {
                "name": "Oxidation — Primary to Aldehyde/Acid, Secondary to Ketone",
                "slug": "alcohol-oxidation"
              },
              {
                "name": "Preparation of Phenols",
                "slug": "phenol-prep"
              }
            ]
          },
          {
            "name": "Aldehydes, Ketones and Carboxylic Acids",
            "slug": "aldehydes-ketones-acids",
            "topics": [
              {
                "name": "Nomenclature and Classification",
                "slug": "carbonyl-nomenclature"
              },
              {
                "name": "Preparation of Aldehydes",
                "slug": "aldehyde-prep"
              },
              {
                "name": "Preparation of Ketones",
                "slug": "ketone-prep"
              },
              {
                "name": "Physical Properties",
                "slug": "carbonyl-physical"
              },
              {
                "name": "Nucleophilic Addition — Mechanism",
                "slug": "nucleophilic-addition"
              },
              {
                "name": "Addition of HCN",
                "slug": "addition-hcn"
              },
              {
                "name": "Addition of NaHSO₃",
                "slug": "addition-nahso3"
              },
              {
                "name": "Addition of Grignard Reagent",
                "slug": "addition-grignard"
              },
              {
                "name": "Addition of NH₃ Derivatives",
                "slug": "addition-nh3-derivatives"
              },
              {
                "name": "Reduction — Clemmensen and Wolff-Kishner",
                "slug": "clemmensen-wolff-kishner"
              }
            ]
          },
          {
            "name": "Amines",
            "slug": "amines",
            "topics": [
              {
                "name": "Classification and IUPAC Nomenclature",
                "slug": "amines-nomenclature"
              },
              {
                "name": "Preparation — Gabriel Synthesis",
                "slug": "gabriel-synthesis"
              },
              {
                "name": "Hoffmann Bromamide Degradation",
                "slug": "hoffmann-degradation"
              },
              {
                "name": "Reduction of Nitrogen Compounds",
                "slug": "reduction-nitrogen"
              },
              {
                "name": "Physical Properties",
                "slug": "amines-physical"
              },
              {
                "name": "Basicity — pKb Values",
                "slug": "amines-basicity"
              },
              {
                "name": "Comparison — Aliphatic vs Aromatic Amines",
                "slug": "aliphatic-aromatic-amines"
              },
              {
                "name": "Effect of Substituents on Basicity",
                "slug": "substituent-basicity"
              },
              {
                "name": "Reactions with Acids and Acylation",
                "slug": "amine-acylation"
              },
              {
                "name": "Reaction with Nitrous Acid (Diazotisation)",
                "slug": "diazotisation"
              }
            ]
          },
          {
            "name": "Biomolecules",
            "slug": "biomolecules",
            "topics": [
              {
                "name": "Carbohydrates — Definition and Classification",
                "slug": "carbohydrates-classification"
              },
              {
                "name": "Glucose — Open Chain and Cyclic (Haworth) Structure",
                "slug": "glucose-structure"
              },
              {
                "name": "Fructose Structure and Mutarotation",
                "slug": "fructose-mutarotation"
              },
              {
                "name": "Disaccharides — Sucrose, Maltose, Lactose",
                "slug": "disaccharides"
              },
              {
                "name": "Polysaccharides — Starch, Cellulose, Glycogen",
                "slug": "polysaccharides"
              },
              {
                "name": "Reducing and Non-Reducing Sugars",
                "slug": "reducing-non-reducing"
              },
              {
                "name": "Glycosidic Bond",
                "slug": "glycosidic-bond"
              },
              {
                "name": "Amino Acids — Structure and Classification",
                "slug": "amino-acids-structure"
              },
              {
                "name": "Essential Amino Acids",
                "slug": "essential-amino-acids"
              },
              {
                "name": "Zwitter Ion",
                "slug": "zwitter-ion"
              }
            ]
          },
          {
            "name": "Polymers",
            "slug": "polymers",
            "topics": [
              {
                "name": "Polymer Terminology — Monomer, Repeat Unit, Chain",
                "slug": "polymer-terminology"
              },
              {
                "name": "Classification — Natural, Synthetic, Semi-Synthetic",
                "slug": "polymer-classification-origin"
              },
              {
                "name": "Classification — Addition and Condensation",
                "slug": "polymer-addition-cond"
              },
              {
                "name": "Classification — Biodegradable and Non-Biodegradable",
                "slug": "polymer-biodegradable"
              },
              {
                "name": "Addition Polymerisation — Free Radical Mechanism",
                "slug": "addition-mechanism"
              },
              {
                "name": "Condensation Polymerisation — Mechanism",
                "slug": "condensation-mechanism"
              },
              {
                "name": "Copolymerisation",
                "slug": "copolymerisation"
              },
              {
                "name": "Natural Rubber and Vulcanisation",
                "slug": "rubber-vulcanisation"
              },
              {
                "name": "Synthetic Rubbers — Neoprene, Buna-S, Buna-N",
                "slug": "synthetic-rubbers"
              },
              {
                "name": "Polyethylene — LDPE and HDPE",
                "slug": "polyethylene"
              }
            ]
          },
          {
            "name": "Chemistry in Everyday Life",
            "slug": "chemistry-everyday-life",
            "topics": [
              {
                "name": "Drugs — Definition and Classification",
                "slug": "drugs-classification"
              },
              {
                "name": "Drug-Target Interaction — Enzyme and Receptor",
                "slug": "drug-target-interaction"
              },
              {
                "name": "Analgesics — Narcotics and Non-Narcotics",
                "slug": "analgesics"
              },
              {
                "name": "Tranquilisers",
                "slug": "tranquilisers"
              },
              {
                "name": "Antiseptics and Disinfectants",
                "slug": "antiseptics-disinfectants"
              },
              {
                "name": "Antibiotics — Bactericidal and Bacteriostatic",
                "slug": "antibiotics"
              },
              {
                "name": "Antacids and Antihistamines",
                "slug": "antacids-antihistamines"
              },
              {
                "name": "Antifertility Drugs",
                "slug": "antifertility"
              },
              {
                "name": "Chemicals in Food — Preservatives",
                "slug": "food-preservatives"
              },
              {
                "name": "Artificial Sweeteners",
                "slug": "artificial-sweeteners"
              }
            ]
          }
        ]
      },
      {
        "name": "Biology",
        "slug": "biology",
        "chapters": [
          {
            "name": "The Living World",
            "slug": "the-living-world",
            "topics": [
              {
                "name": "What is Living? — Criteria",
                "slug": "what-is-living"
              },
              {
                "name": "Taxonomic Categories and Hierarchy",
                "slug": "taxonomic-hierarchy"
              },
              {
                "name": "Binomial Nomenclature",
                "slug": "binomial-nomenclature"
              },
              {
                "name": "Taxonomical Aids",
                "slug": "taxonomical-aids"
              }
            ]
          },
          {
            "name": "Biological Classification",
            "slug": "biological-classification",
            "topics": [
              {
                "name": "Five Kingdom Classification",
                "slug": "five-kingdom"
              },
              {
                "name": "Kingdom Monera",
                "slug": "monera"
              },
              {
                "name": "Kingdom Protista",
                "slug": "protista"
              },
              {
                "name": "Kingdom Fungi",
                "slug": "fungi"
              },
              {
                "name": "Viruses, Viroids and Lichens",
                "slug": "viruses-viroids-lichens"
              }
            ]
          },
          {
            "name": "Plant Kingdom",
            "slug": "plant-kingdom",
            "topics": [
              {
                "name": "Algae",
                "slug": "algae"
              },
              {
                "name": "Bryophytes",
                "slug": "bryophytes"
              },
              {
                "name": "Pteridophytes",
                "slug": "pteridophytes"
              },
              {
                "name": "Gymnosperms",
                "slug": "gymnosperms"
              },
              {
                "name": "Angiosperms",
                "slug": "angiosperms"
              },
              {
                "name": "Alternation of Generations",
                "slug": "alternation-generations"
              }
            ]
          },
          {
            "name": "Animal Kingdom",
            "slug": "animal-kingdom",
            "topics": [
              {
                "name": "Basis of Classification",
                "slug": "basis-classification"
              },
              {
                "name": "Porifera and Coelenterata",
                "slug": "porifera-coelenterata"
              },
              {
                "name": "Worms — Platyhelminthes, Nematoda, Annelida",
                "slug": "worm-phyla"
              },
              {
                "name": "Arthropoda and Mollusca",
                "slug": "arthropoda-mollusca"
              },
              {
                "name": "Echinodermata and Hemichordata",
                "slug": "minor-phyla"
              },
              {
                "name": "Chordates — Fish to Mammalia",
                "slug": "chordates"
              }
            ]
          },
          {
            "name": "Morphology of Flowering Plants",
            "slug": "morphology-flowering-plants",
            "topics": [
              {
                "name": "Root — Types and Modifications",
                "slug": "root"
              },
              {
                "name": "Stem — Types and Modifications",
                "slug": "stem"
              },
              {
                "name": "Leaf — Parts and Modifications",
                "slug": "leaf"
              },
              {
                "name": "Flower — Parts and Types",
                "slug": "flower"
              },
              {
                "name": "Fruit and Seed",
                "slug": "fruit-seed"
              },
              {
                "name": "Important Families",
                "slug": "plant-families"
              }
            ]
          },
          {
            "name": "Anatomy of Flowering Plants",
            "slug": "anatomy-flowering-plants",
            "topics": [
              {
                "name": "Meristematic and Permanent Tissues",
                "slug": "plant-tissues"
              },
              {
                "name": "Tissue Systems",
                "slug": "tissue-systems"
              },
              {
                "name": "Anatomy of Dicot and Monocot Root",
                "slug": "root-anatomy"
              },
              {
                "name": "Anatomy of Dicot and Monocot Stem",
                "slug": "stem-anatomy"
              },
              {
                "name": "Anatomy of Dicot and Monocot Leaf",
                "slug": "leaf-anatomy"
              },
              {
                "name": "Secondary Growth",
                "slug": "secondary-growth"
              }
            ]
          },
          {
            "name": "Structural Organisation in Animals",
            "slug": "structural-organisation-animals",
            "topics": [
              {
                "name": "Animal Tissues",
                "slug": "animal-tissues"
              },
              {
                "name": "Earthworm — Morphology and Anatomy",
                "slug": "earthworm"
              },
              {
                "name": "Cockroach — Morphology and Anatomy",
                "slug": "cockroach"
              },
              {
                "name": "Frog — Morphology and Anatomy",
                "slug": "frog"
              }
            ]
          },
          {
            "name": "Cell: The Unit of Life",
            "slug": "cell-unit-of-life",
            "topics": [
              {
                "name": "Prokaryotic vs Eukaryotic Cell",
                "slug": "prokaryotic-eukaryotic"
              },
              {
                "name": "Cell Membrane and Cell Wall",
                "slug": "membrane-wall"
              },
              {
                "name": "Endomembrane System",
                "slug": "endomembrane"
              },
              {
                "name": "Mitochondria and Plastids",
                "slug": "mitochondria-plastids"
              },
              {
                "name": "Nucleus",
                "slug": "nucleus"
              },
              {
                "name": "Cytoskeleton and Centrosome",
                "slug": "cytoskeleton"
              }
            ]
          },
          {
            "name": "Biomolecules",
            "slug": "biomolecules",
            "topics": [
              {
                "name": "Carbohydrates — Definition and Classification",
                "slug": "carbohydrates-classification"
              },
              {
                "name": "Glucose — Open Chain and Cyclic (Haworth) Structure",
                "slug": "glucose-structure"
              },
              {
                "name": "Fructose Structure and Mutarotation",
                "slug": "fructose-mutarotation"
              },
              {
                "name": "Disaccharides — Sucrose, Maltose, Lactose",
                "slug": "disaccharides"
              },
              {
                "name": "Polysaccharides — Starch, Cellulose, Glycogen",
                "slug": "polysaccharides"
              },
              {
                "name": "Reducing and Non-Reducing Sugars",
                "slug": "reducing-non-reducing"
              },
              {
                "name": "Glycosidic Bond",
                "slug": "glycosidic-bond"
              },
              {
                "name": "Amino Acids — Structure and Classification",
                "slug": "amino-acids-structure"
              },
              {
                "name": "Essential Amino Acids",
                "slug": "essential-amino-acids"
              },
              {
                "name": "Zwitter Ion",
                "slug": "zwitter-ion"
              }
            ]
          },
          {
            "name": "Cell Cycle and Cell Division",
            "slug": "cell-cycle-division",
            "topics": [
              {
                "name": "Cell Cycle Phases — G1, S, G2, M",
                "slug": "cell-cycle-phases"
              },
              {
                "name": "Mitosis — Stages and Significance",
                "slug": "mitosis"
              },
              {
                "name": "Meiosis I",
                "slug": "meiosis-i"
              },
              {
                "name": "Meiosis II and Significance",
                "slug": "meiosis-ii"
              }
            ]
          },
          {
            "name": "Transport in Plants",
            "slug": "transport-in-plants",
            "topics": [
              {
                "name": "Osmosis and Water Potential",
                "slug": "osmosis-water-potential"
              },
              {
                "name": "Plasmolysis and Turgor Pressure",
                "slug": "plasmolysis-turgor"
              },
              {
                "name": "Transpiration and Stomatal Mechanism",
                "slug": "transpiration"
              },
              {
                "name": "Ascent of Sap",
                "slug": "ascent-sap"
              },
              {
                "name": "Phloem Transport and Source-Sink",
                "slug": "phloem-transport"
              }
            ]
          },
          {
            "name": "Mineral Nutrition",
            "slug": "mineral-nutrition",
            "topics": [
              {
                "name": "Essential Mineral Elements",
                "slug": "essential-minerals"
              },
              {
                "name": "Macro and Micronutrients",
                "slug": "macro-micro"
              },
              {
                "name": "Deficiency Symptoms",
                "slug": "deficiency-symptoms"
              },
              {
                "name": "Nitrogen Fixation",
                "slug": "nitrogen-fixation"
              },
              {
                "name": "Nitrogen Cycle",
                "slug": "nitrogen-cycle"
              }
            ]
          },
          {
            "name": "Photosynthesis in Higher Plants",
            "slug": "photosynthesis",
            "topics": [
              {
                "name": "Photosynthetic Pigments",
                "slug": "pigments"
              },
              {
                "name": "Light Reactions — PS I and PS II",
                "slug": "light-reactions"
              },
              {
                "name": "Electron Transport and ATP Synthesis",
                "slug": "etc-atp"
              },
              {
                "name": "Calvin Cycle (C3 Pathway)",
                "slug": "calvin-cycle"
              },
              {
                "name": "C4 Pathway and Kranz Anatomy",
                "slug": "c4-pathway"
              },
              {
                "name": "CAM Plants and Photorespiration",
                "slug": "cam-photorespiration"
              }
            ]
          },
          {
            "name": "Respiration in Plants",
            "slug": "respiration-plants",
            "topics": [
              {
                "name": "Glycolysis",
                "slug": "glycolysis"
              },
              {
                "name": "Fermentation",
                "slug": "fermentation"
              },
              {
                "name": "Krebs Cycle",
                "slug": "krebs-cycle"
              },
              {
                "name": "Electron Transport System",
                "slug": "ets"
              },
              {
                "name": "Energy Yield and Respiratory Quotient",
                "slug": "energy-rq"
              }
            ]
          },
          {
            "name": "Plant Growth and Development",
            "slug": "plant-growth-development",
            "topics": [
              {
                "name": "Growth — Phases and Measurement",
                "slug": "growth-phases"
              },
              {
                "name": "Auxin",
                "slug": "auxin"
              },
              {
                "name": "Gibberellins and Cytokinins",
                "slug": "gibberellins-cytokinins"
              },
              {
                "name": "Ethylene and ABA",
                "slug": "ethylene-aba"
              },
              {
                "name": "Photoperiodism and Vernalisation",
                "slug": "photoperiodism-vernalisation"
              }
            ]
          },
          {
            "name": "Digestion and Absorption",
            "slug": "digestion-absorption",
            "topics": [
              {
                "name": "Alimentary Canal",
                "slug": "alimentary-canal"
              },
              {
                "name": "Digestive Enzymes and Digestion",
                "slug": "digestive-enzymes"
              },
              {
                "name": "Absorption and Assimilation",
                "slug": "absorption-assimilation"
              },
              {
                "name": "Digestive Disorders",
                "slug": "digestive-disorders"
              }
            ]
          },
          {
            "name": "Breathing and Exchange of Gases",
            "slug": "breathing-exchange-gases",
            "topics": [
              {
                "name": "Mechanism of Breathing",
                "slug": "breathing-mechanism"
              },
              {
                "name": "Lung Volumes and Capacities",
                "slug": "lung-volumes"
              },
              {
                "name": "Exchange and Transport of Gases",
                "slug": "gas-exchange-transport"
              },
              {
                "name": "Regulation of Breathing",
                "slug": "breathing-regulation"
              },
              {
                "name": "Respiratory Disorders",
                "slug": "respiratory-disorders"
              }
            ]
          },
          {
            "name": "Body Fluids and Circulation",
            "slug": "body-fluids-circulation",
            "topics": [
              {
                "name": "Blood — Composition and Functions",
                "slug": "blood-composition"
              },
              {
                "name": "Blood Groups and Coagulation",
                "slug": "blood-groups-coagulation"
              },
              {
                "name": "Human Heart — Structure",
                "slug": "heart-structure"
              },
              {
                "name": "Cardiac Cycle and ECG",
                "slug": "cardiac-cycle-ecg"
              },
              {
                "name": "Circulatory Pathways and Lymph",
                "slug": "circulation-lymph"
              }
            ]
          },
          {
            "name": "Excretory Products and their Elimination",
            "slug": "excretory-products",
            "topics": [
              {
                "name": "Modes of Excretion",
                "slug": "excretion-modes"
              },
              {
                "name": "Nephron Structure",
                "slug": "nephron"
              },
              {
                "name": "Urine Formation",
                "slug": "urine-formation"
              },
              {
                "name": "Regulation of Kidney Function",
                "slug": "kidney-regulation"
              },
              {
                "name": "Role of Other Organs in Excretion",
                "slug": "other-excretion"
              }
            ]
          },
          {
            "name": "Locomotion and Movement",
            "slug": "locomotion-movement",
            "topics": [
              {
                "name": "Muscle Fibre Structure",
                "slug": "muscle-structure"
              },
              {
                "name": "Mechanism of Muscle Contraction",
                "slug": "muscle-contraction"
              },
              {
                "name": "Skeletal System",
                "slug": "skeletal-system"
              },
              {
                "name": "Joints",
                "slug": "joints"
              },
              {
                "name": "Musculoskeletal Disorders",
                "slug": "disorders"
              }
            ]
          },
          {
            "name": "Neural Control and Coordination",
            "slug": "neural-control",
            "topics": [
              {
                "name": "Neuron and Nerve Impulse",
                "slug": "neuron-impulse"
              },
              {
                "name": "Synapse and Neurotransmitters",
                "slug": "synapse"
              },
              {
                "name": "Central Nervous System",
                "slug": "cns"
              },
              {
                "name": "Peripheral and Autonomic Nervous System",
                "slug": "pns-ans"
              },
              {
                "name": "Reflex Action",
                "slug": "reflex"
              },
              {
                "name": "Eye and Ear",
                "slug": "eye-ear"
              }
            ]
          },
          {
            "name": "Chemical Coordination and Integration",
            "slug": "chemical-coordination",
            "topics": [
              {
                "name": "Hypothalamus and Pituitary",
                "slug": "hypothalamus-pituitary"
              },
              {
                "name": "Thyroid, Parathyroid and Adrenal",
                "slug": "thyroid-adrenal"
              },
              {
                "name": "Pancreas, Gonads and Other Glands",
                "slug": "pancreas-gonads"
              },
              {
                "name": "Mechanism of Hormone Action",
                "slug": "hormone-action"
              }
            ]
          },
          {
            "name": "Reproduction in Organisms",
            "slug": "reproduction-organisms",
            "topics": [
              {
                "name": "Modes of Asexual Reproduction",
                "slug": "asexual-modes"
              },
              {
                "name": "Events of Sexual Reproduction",
                "slug": "sexual-events"
              },
              {
                "name": "Significance of Reproduction",
                "slug": "reproduction-significance"
              }
            ]
          },
          {
            "name": "Sexual Reproduction in Flowering Plants",
            "slug": "sexual-reproduction-flowering",
            "topics": [
              {
                "name": "Flower Structure and Male Gametophyte",
                "slug": "male-gametophyte"
              },
              {
                "name": "Female Gametophyte",
                "slug": "female-gametophyte"
              },
              {
                "name": "Pollination",
                "slug": "pollination"
              },
              {
                "name": "Double Fertilisation",
                "slug": "double-fertilisation"
              },
              {
                "name": "Endosperm, Embryo and Seed",
                "slug": "endosperm-embryo"
              },
              {
                "name": "Apomixis and Polyembryony",
                "slug": "apomixis"
              }
            ]
          },
          {
            "name": "Human Reproduction",
            "slug": "human-reproduction",
            "topics": [
              {
                "name": "Male Reproductive System",
                "slug": "male-repro"
              },
              {
                "name": "Female Reproductive System",
                "slug": "female-repro"
              },
              {
                "name": "Gametogenesis",
                "slug": "gametogenesis"
              },
              {
                "name": "Menstrual Cycle",
                "slug": "menstrual-cycle"
              },
              {
                "name": "Fertilisation and Implantation",
                "slug": "fertilisation-implantation"
              },
              {
                "name": "Embryonic Development and Parturition",
                "slug": "embryo-parturition"
              }
            ]
          },
          {
            "name": "Reproductive Health",
            "slug": "reproductive-health",
            "topics": [
              {
                "name": "STDs",
                "slug": "stds"
              },
              {
                "name": "Contraception Methods",
                "slug": "contraception"
              },
              {
                "name": "MTP",
                "slug": "mtp"
              },
              {
                "name": "Infertility and ART",
                "slug": "infertility-art"
              }
            ]
          },
          {
            "name": "Principles of Inheritance and Variation",
            "slug": "inheritance-variation",
            "topics": [
              {
                "name": "Mendel's Laws",
                "slug": "mendels-laws"
              },
              {
                "name": "Dihybrid Cross",
                "slug": "dihybrid-cross"
              },
              {
                "name": "Incomplete Dominance and Co-Dominance",
                "slug": "incomplete-co-dominance"
              },
              {
                "name": "Sex Determination",
                "slug": "sex-determination"
              },
              {
                "name": "Linkage and Crossing Over",
                "slug": "linkage-crossing"
              },
              {
                "name": "Mutation and Chromosomal Disorders",
                "slug": "mutation-chromosomal"
              },
              {
                "name": "Pedigree Analysis",
                "slug": "pedigree"
              }
            ]
          },
          {
            "name": "Molecular Basis of Inheritance",
            "slug": "molecular-basis-inheritance",
            "topics": [
              {
                "name": "DNA Structure — Watson-Crick Model",
                "slug": "dna-structure"
              },
              {
                "name": "DNA Replication",
                "slug": "dna-replication"
              },
              {
                "name": "Transcription",
                "slug": "transcription"
              },
              {
                "name": "Genetic Code",
                "slug": "genetic-code"
              },
              {
                "name": "Translation",
                "slug": "translation"
              },
              {
                "name": "Lac Operon",
                "slug": "lac-operon"
              },
              {
                "name": "Human Genome Project and DNA Fingerprinting",
                "slug": "hgp-dna-fingerprinting"
              }
            ]
          },
          {
            "name": "Evolution",
            "slug": "evolution",
            "topics": [
              {
                "name": "Origin of Life",
                "slug": "origin-life"
              },
              {
                "name": "Theories of Evolution",
                "slug": "theories-evolution"
              },
              {
                "name": "Evidence of Evolution",
                "slug": "evidence-evolution"
              },
              {
                "name": "Natural Selection",
                "slug": "natural-selection"
              },
              {
                "name": "Hardy-Weinberg Principle",
                "slug": "hardy-weinberg"
              },
              {
                "name": "Human Evolution",
                "slug": "human-evolution"
              }
            ]
          },
          {
            "name": "Human Health and Disease",
            "slug": "human-health-disease",
            "topics": [
              {
                "name": "Common Diseases",
                "slug": "common-diseases"
              },
              {
                "name": "Immunity — Innate and Adaptive",
                "slug": "immunity"
              },
              {
                "name": "Vaccination",
                "slug": "vaccination"
              },
              {
                "name": "AIDS",
                "slug": "aids"
              },
              {
                "name": "Cancer",
                "slug": "cancer"
              },
              {
                "name": "Drugs and Alcohol Abuse",
                "slug": "drugs-alcohol"
              }
            ]
          },
          {
            "name": "Strategies for Enhancement in Food Production",
            "slug": "food-production",
            "topics": [
              {
                "name": "Plant Breeding",
                "slug": "plant-breeding"
              },
              {
                "name": "Animal Husbandry",
                "slug": "animal-husbandry"
              },
              {
                "name": "Tissue Culture",
                "slug": "tissue-culture"
              },
              {
                "name": "Biofortification and SCP",
                "slug": "biofortification-scp"
              }
            ]
          },
          {
            "name": "Microbes in Human Welfare",
            "slug": "microbes-human-welfare",
            "topics": [
              {
                "name": "Microbes in Household and Industrial Products",
                "slug": "microbes-household-industrial"
              },
              {
                "name": "Sewage Treatment",
                "slug": "sewage-treatment"
              },
              {
                "name": "Biogas Production",
                "slug": "biogas"
              },
              {
                "name": "Biocontrol Agents and Biofertilisers",
                "slug": "biocontrol-biofertilisers"
              }
            ]
          },
          {
            "name": "Biotechnology: Principles and Processes",
            "slug": "biotechnology-principles",
            "topics": [
              {
                "name": "Principles of Recombinant DNA Technology",
                "slug": "rdt-principles"
              },
              {
                "name": "Restriction Enzymes",
                "slug": "restriction-enzymes"
              },
              {
                "name": "Cloning Vectors",
                "slug": "vectors"
              },
              {
                "name": "PCR",
                "slug": "pcr"
              },
              {
                "name": "Gel Electrophoresis",
                "slug": "gel-electrophoresis"
              }
            ]
          },
          {
            "name": "Biotechnology and its Applications",
            "slug": "biotechnology-applications",
            "topics": [
              {
                "name": "GM Crops — Bt Cotton and Pest Resistance",
                "slug": "bt-gm-crops"
              },
              {
                "name": "Biotechnology in Medicine",
                "slug": "medical-biotech"
              },
              {
                "name": "Molecular Diagnosis",
                "slug": "molecular-diagnosis"
              },
              {
                "name": "Ethical Issues",
                "slug": "biotech-ethics"
              }
            ]
          },
          {
            "name": "Organisms and Populations",
            "slug": "organisms-populations",
            "topics": [
              {
                "name": "Abiotic Factors and Adaptations",
                "slug": "abiotic-adaptations"
              },
              {
                "name": "Population Growth Models",
                "slug": "population-growth"
              },
              {
                "name": "Population Interactions",
                "slug": "population-interactions"
              }
            ]
          },
          {
            "name": "Ecosystem",
            "slug": "ecosystem",
            "topics": [
              {
                "name": "Ecosystem Structure and Productivity",
                "slug": "ecosystem-structure"
              },
              {
                "name": "Energy Flow and Ecological Pyramids",
                "slug": "energy-pyramids"
              },
              {
                "name": "Decomposition",
                "slug": "decomposition"
              },
              {
                "name": "Nutrient Cycling",
                "slug": "nutrient-cycling"
              },
              {
                "name": "Ecological Succession",
                "slug": "succession"
              }
            ]
          },
          {
            "name": "Biodiversity and Conservation",
            "slug": "biodiversity-conservation",
            "topics": [
              {
                "name": "Biodiversity — Levels and Patterns",
                "slug": "biodiversity-levels"
              },
              {
                "name": "Loss of Biodiversity",
                "slug": "biodiversity-loss"
              },
              {
                "name": "In-Situ Conservation",
                "slug": "in-situ"
              },
              {
                "name": "Ex-Situ Conservation",
                "slug": "ex-situ"
              }
            ]
          },
          {
            "name": "Environmental Issues",
            "slug": "environmental-issues",
            "topics": [
              {
                "name": "Air Pollution and Control",
                "slug": "air-pollution"
              },
              {
                "name": "Water Pollution",
                "slug": "water-pollution"
              },
              {
                "name": "Greenhouse Effect and Global Warming",
                "slug": "greenhouse-global-warming"
              },
              {
                "name": "Ozone Depletion",
                "slug": "ozone-depletion"
              },
              {
                "name": "Deforestation and Solid Waste",
                "slug": "deforestation-solid-waste"
              }
            ]
          }
        ]
      }
    ]
  },
  "ssc-cgl": {
    "name": "SSC CGL",
    "subjects": [
      {
        "name": "Quantitative Aptitude",
        "slug": "quantitative-aptitude",
        "chapters": [
          {
            "name": "Number System",
            "slug": "number-system",
            "topics": [
              {
                "name": "Types of Numbers — Natural, Integer, Rational, Irrational",
                "slug": "types-numbers"
              },
              {
                "name": "Divisibility Rules",
                "slug": "divisibility-rules"
              },
              {
                "name": "LCM and HCF",
                "slug": "lcm-hcf"
              },
              {
                "name": "Factors and Multiples",
                "slug": "factors-multiples"
              },
              {
                "name": "Unit Digit Calculation",
                "slug": "unit-digit"
              },
              {
                "name": "Remainders — Basic and Advanced",
                "slug": "remainders"
              },
              {
                "name": "Cyclicity",
                "slug": "cyclicity"
              },
              {
                "name": "Number Series Patterns",
                "slug": "number-patterns"
              },
              {
                "name": "Square Roots and Cube Roots",
                "slug": "square-cube-roots"
              }
            ]
          },
          {
            "name": "Simplification and Approximation",
            "slug": "simplification",
            "topics": [
              {
                "name": "BODMAS Rule",
                "slug": "bodmas"
              },
              {
                "name": "Fractions and Decimals",
                "slug": "fractions-decimals"
              },
              {
                "name": "Surds and Indices",
                "slug": "surds-indices"
              },
              {
                "name": "Approximation Techniques",
                "slug": "approximation"
              },
              {
                "name": "Square and Cube Values",
                "slug": "square-cube-values"
              }
            ]
          },
          {
            "name": "Percentage",
            "slug": "percentage",
            "topics": [
              {
                "name": "Basic Percentage Concepts",
                "slug": "basic-percentage"
              },
              {
                "name": "Percentage Increase and Decrease",
                "slug": "percentage-change"
              },
              {
                "name": "Percentage of a Quantity",
                "slug": "percentage-of"
              },
              {
                "name": "Successive Percentage Change",
                "slug": "successive-change"
              },
              {
                "name": "Percentage in Profit-Loss",
                "slug": "percentage-pl"
              },
              {
                "name": "Percentage in Data Interpretation",
                "slug": "percentage-di"
              },
              {
                "name": "Population Problems",
                "slug": "population-percentage"
              }
            ]
          },
          {
            "name": "Ratio and Proportion",
            "slug": "ratio-proportion",
            "topics": [
              {
                "name": "Ratio — Basic Concepts",
                "slug": "ratio-basics"
              },
              {
                "name": "Proportion — Direct and Inverse",
                "slug": "proportion"
              },
              {
                "name": "Componendo and Dividendo",
                "slug": "componendo-dividendo"
              },
              {
                "name": "Partnership — Simple",
                "slug": "partnership-simple"
              },
              {
                "name": "Partnership — Compound",
                "slug": "partnership-compound"
              },
              {
                "name": "Duplicate, Triplicate Ratios",
                "slug": "duplicate-ratio"
              }
            ]
          },
          {
            "name": "Average",
            "slug": "average",
            "topics": [
              {
                "name": "Simple Average",
                "slug": "simple-average"
              },
              {
                "name": "Weighted Average",
                "slug": "weighted-average"
              },
              {
                "name": "Average of Consecutive Numbers",
                "slug": "consecutive-avg"
              },
              {
                "name": "Effect of Adding/Removing a Term",
                "slug": "add-remove-avg"
              },
              {
                "name": "Average Speed",
                "slug": "average-speed"
              }
            ]
          },
          {
            "name": "Profit, Loss and Discount",
            "slug": "profit-loss-discount",
            "topics": [
              {
                "name": "Profit and Loss — Basic",
                "slug": "profit-loss-basic"
              },
              {
                "name": "Marked Price and Selling Price",
                "slug": "marked-selling"
              },
              {
                "name": "Discount and Net Price",
                "slug": "discount-net"
              },
              {
                "name": "Successive Discounts",
                "slug": "successive-discounts"
              },
              {
                "name": "Dishonest Dealings — False Weight",
                "slug": "false-weight"
              },
              {
                "name": "Cost Price when Multiple Items",
                "slug": "cp-multiple"
              }
            ]
          },
          {
            "name": "Simple and Compound Interest",
            "slug": "interest",
            "topics": [
              {
                "name": "Simple Interest — Formula",
                "slug": "si-formula"
              },
              {
                "name": "Compound Interest — Formula",
                "slug": "ci-formula"
              },
              {
                "name": "CI vs SI Difference",
                "slug": "ci-si-diff"
              },
              {
                "name": "Half-Yearly and Quarterly CI",
                "slug": "quarterly-ci"
              },
              {
                "name": "Depreciation",
                "slug": "depreciation"
              },
              {
                "name": "Instalment Problems",
                "slug": "instalment"
              }
            ]
          },
          {
            "name": "Mixture and Alligation",
            "slug": "mixture-alligation",
            "topics": [
              {
                "name": "Alligation Rule",
                "slug": "alligation-rule"
              },
              {
                "name": "Mean Price Concept",
                "slug": "mean-price"
              },
              {
                "name": "Mixing Two Solutions",
                "slug": "mixing-solutions"
              },
              {
                "name": "Mixing Three Solutions",
                "slug": "mixing-three"
              },
              {
                "name": "Removal and Replacement Problems",
                "slug": "removal-replacement"
              }
            ]
          },
          {
            "name": "Time and Work",
            "slug": "time-work",
            "topics": [
              {
                "name": "Work Done in a Given Time",
                "slug": "work-time"
              },
              {
                "name": "Efficiency and Work Ratio",
                "slug": "efficiency-ratio"
              },
              {
                "name": "Work and Wages",
                "slug": "work-wages"
              },
              {
                "name": "MDH Formula (Men-Days-Hours)",
                "slug": "mdh-formula"
              },
              {
                "name": "Alternate Day Working",
                "slug": "alternate-day"
              }
            ]
          },
          {
            "name": "Pipes and Cisterns",
            "slug": "pipes-cisterns",
            "topics": [
              {
                "name": "Filling and Emptying Pipes",
                "slug": "filling-emptying"
              },
              {
                "name": "Two Pipes Together",
                "slug": "two-pipes"
              },
              {
                "name": "Leak in a Tank",
                "slug": "leak-tank"
              },
              {
                "name": "Pipes Opened at Different Times",
                "slug": "pipes-different-times"
              }
            ]
          },
          {
            "name": "Time, Speed and Distance",
            "slug": "time-speed-distance",
            "topics": [
              {
                "name": "Speed, Distance, Time — Basic",
                "slug": "sdt-basic"
              },
              {
                "name": "Average Speed",
                "slug": "average-speed-sdt"
              },
              {
                "name": "Relative Speed — Same and Opposite Direction",
                "slug": "relative-speed"
              },
              {
                "name": "Meeting Point Problems",
                "slug": "meeting-point"
              },
              {
                "name": "Circular Track Problems",
                "slug": "circular-track"
              }
            ]
          },
          {
            "name": "Problems on Trains",
            "slug": "problems-trains",
            "topics": [
              {
                "name": "Train Crossing a Pole or Person",
                "slug": "train-crossing-pole"
              },
              {
                "name": "Train Crossing a Bridge or Platform",
                "slug": "train-crossing-platform"
              },
              {
                "name": "Two Trains — Same and Opposite Direction",
                "slug": "two-trains"
              },
              {
                "name": "Train and a Moving Object",
                "slug": "train-moving-object"
              }
            ]
          },
          {
            "name": "Boats and Streams",
            "slug": "boats-streams",
            "topics": [
              {
                "name": "Upstream and Downstream Speed",
                "slug": "upstream-downstream"
              },
              {
                "name": "Speed of Boat in Still Water",
                "slug": "boat-still-water"
              },
              {
                "name": "Speed of Stream",
                "slug": "stream-speed"
              },
              {
                "name": "Distance Covered Up and Down",
                "slug": "distance-up-down"
              },
              {
                "name": "Round Trip Problems",
                "slug": "round-trip"
              }
            ]
          },
          {
            "name": "Algebra",
            "slug": "algebra",
            "topics": [
              {
                "name": "Algebraic Identities",
                "slug": "algebraic-identities"
              },
              {
                "name": "Linear Equations in One Variable",
                "slug": "linear-one-var"
              },
              {
                "name": "Linear Equations in Two Variables",
                "slug": "linear-two-var"
              },
              {
                "name": "Quadratic Equations",
                "slug": "quadratic"
              },
              {
                "name": "Polynomials — Remainder Theorem",
                "slug": "remainder-theorem"
              },
              {
                "name": "Inequalities",
                "slug": "inequalities"
              }
            ]
          },
          {
            "name": "Geometry",
            "slug": "geometry",
            "topics": [
              {
                "name": "Lines, Angles and Parallel Lines",
                "slug": "lines-angles"
              },
              {
                "name": "Triangles — Properties and Congruence",
                "slug": "triangles"
              },
              {
                "name": "Similarity of Triangles",
                "slug": "similarity"
              },
              {
                "name": "Circles — Chords, Tangents, Angles",
                "slug": "circles"
              },
              {
                "name": "Quadrilaterals and Polygons",
                "slug": "quadrilaterals-polygons"
              },
              {
                "name": "Coordinate Geometry — Basics",
                "slug": "coordinate-basics"
              }
            ]
          },
          {
            "name": "Mensuration",
            "slug": "mensuration",
            "topics": [
              {
                "name": "Triangle, Square, Rectangle, Parallelogram, Rhombus",
                "slug": "2d-basic-shapes"
              },
              {
                "name": "Circle, Sector and Segment",
                "slug": "circle-sector"
              },
              {
                "name": "Trapezium and Polygon",
                "slug": "trapezium-polygon"
              },
              {
                "name": "Cube and Cuboid",
                "slug": "cube-cuboid"
              },
              {
                "name": "Cylinder",
                "slug": "cylinder"
              },
              {
                "name": "Cone and Frustum",
                "slug": "cone-frustum"
              },
              {
                "name": "Sphere and Hemisphere",
                "slug": "sphere-hemisphere"
              }
            ]
          },
          {
            "name": "Trigonometry",
            "slug": "trigonometry-ssc",
            "topics": [
              {
                "name": "Trigonometric Ratios and Standard Values",
                "slug": "trig-ratios"
              },
              {
                "name": "Complementary Angles",
                "slug": "complementary-angles"
              },
              {
                "name": "Trigonometric Identities",
                "slug": "trig-identities"
              },
              {
                "name": "Trigonometric Equations",
                "slug": "trig-equations"
              },
              {
                "name": "Maximum and Minimum of Trig Expressions",
                "slug": "trig-maxmin"
              }
            ]
          },
          {
            "name": "Heights and Distances",
            "slug": "heights-distances",
            "topics": [
              {
                "name": "Angle of Elevation",
                "slug": "angle-elevation"
              },
              {
                "name": "Angle of Depression",
                "slug": "angle-depression"
              },
              {
                "name": "Single Observer Problems",
                "slug": "single-observer"
              },
              {
                "name": "Two Observer Problems",
                "slug": "two-observer"
              },
              {
                "name": "Problems on Towers and Buildings",
                "slug": "towers-buildings"
              },
              {
                "name": "Shadow and Pole Problems",
                "slug": "shadow-pole"
              }
            ]
          },
          {
            "name": "Statistics and Data Interpretation",
            "slug": "statistics-di",
            "topics": [
              {
                "name": "Mean, Median and Mode",
                "slug": "mean-median-mode"
              },
              {
                "name": "Range and Standard Deviation",
                "slug": "range-sd"
              },
              {
                "name": "Bar Graph",
                "slug": "bar-graph"
              },
              {
                "name": "Pie Chart",
                "slug": "pie-chart"
              },
              {
                "name": "Line Graph",
                "slug": "line-graph"
              },
              {
                "name": "Table Chart",
                "slug": "table-chart"
              },
              {
                "name": "Mixed DI",
                "slug": "mixed-di"
              }
            ]
          }
        ]
      },
      {
        "name": "General Intelligence and Reasoning",
        "slug": "general-intelligence-reasoning",
        "chapters": [
          {
            "name": "Analogy",
            "slug": "analogy",
            "topics": [
              {
                "name": "Word Analogy",
                "slug": "word-analogy"
              },
              {
                "name": "Number Analogy",
                "slug": "number-analogy"
              },
              {
                "name": "Letter Analogy",
                "slug": "letter-analogy"
              },
              {
                "name": "Figure/Image Analogy",
                "slug": "figure-analogy"
              },
              {
                "name": "GK-Based Analogy",
                "slug": "gk-analogy"
              }
            ]
          },
          {
            "name": "Classification",
            "slug": "classification",
            "topics": [
              {
                "name": "Word Classification — Odd One Out",
                "slug": "word-classification"
              },
              {
                "name": "Number Classification",
                "slug": "number-classification"
              },
              {
                "name": "Letter Classification",
                "slug": "letter-classification"
              },
              {
                "name": "Figure Classification",
                "slug": "figure-classification"
              }
            ]
          },
          {
            "name": "Series",
            "slug": "series",
            "topics": [
              {
                "name": "Number Series — Missing Term",
                "slug": "number-series-missing"
              },
              {
                "name": "Number Series — Wrong Term",
                "slug": "number-series-wrong"
              },
              {
                "name": "Letter Series",
                "slug": "letter-series"
              },
              {
                "name": "Alphanumeric Series",
                "slug": "alphanumeric-series"
              },
              {
                "name": "Figure Series",
                "slug": "figure-series"
              }
            ]
          },
          {
            "name": "Coding and Decoding",
            "slug": "coding-decoding",
            "topics": [
              {
                "name": "Letter Coding",
                "slug": "letter-coding"
              },
              {
                "name": "Number Coding",
                "slug": "number-coding"
              },
              {
                "name": "Symbol Coding",
                "slug": "symbol-coding"
              },
              {
                "name": "Matrix Coding",
                "slug": "matrix-coding"
              },
              {
                "name": "Condition-Based Coding",
                "slug": "condition-coding"
              }
            ]
          },
          {
            "name": "Blood Relations",
            "slug": "blood-relations",
            "topics": [
              {
                "name": "Direct Blood Relations",
                "slug": "direct-blood"
              },
              {
                "name": "Coded Blood Relations",
                "slug": "coded-blood"
              },
              {
                "name": "Family Tree Problems",
                "slug": "family-tree"
              },
              {
                "name": "Pointing / Referring Problems",
                "slug": "pointing-problems"
              }
            ]
          },
          {
            "name": "Order and Ranking",
            "slug": "order-ranking",
            "topics": [
              {
                "name": "Rank from Top and Bottom",
                "slug": "rank-top-bottom"
              },
              {
                "name": "Position in Row and Column",
                "slug": "position-row-col"
              },
              {
                "name": "Comparison of Heights/Weights",
                "slug": "comparison"
              },
              {
                "name": "Arrangement Problems",
                "slug": "arrangement"
              }
            ]
          },
          {
            "name": "Direction and Distance",
            "slug": "direction-distance",
            "topics": [
              {
                "name": "Cardinal Directions",
                "slug": "cardinal-directions"
              },
              {
                "name": "Turns and Final Direction",
                "slug": "turns-direction"
              },
              {
                "name": "Shortest Distance",
                "slug": "shortest-distance"
              },
              {
                "name": "Shadow-Based Direction",
                "slug": "shadow-direction"
              }
            ]
          },
          {
            "name": "Mathematical Operations",
            "slug": "mathematical-operations",
            "topics": [
              {
                "name": "Mathematical Signs Substitution",
                "slug": "signs-substitution"
              },
              {
                "name": "Balancing Equations",
                "slug": "balancing-equations"
              },
              {
                "name": "Number Puzzles",
                "slug": "number-puzzles"
              },
              {
                "name": "BODMAS-Based Operations",
                "slug": "bodmas-operations"
              }
            ]
          },
          {
            "name": "Puzzles and Seating Arrangement",
            "slug": "puzzles-seating",
            "topics": [
              {
                "name": "Linear Seating Arrangement",
                "slug": "linear-seating"
              },
              {
                "name": "Circular Seating Arrangement",
                "slug": "circular-seating"
              },
              {
                "name": "Floor-Based Puzzles",
                "slug": "floor-puzzles"
              },
              {
                "name": "Box and Stack Puzzles",
                "slug": "box-stack-puzzles"
              },
              {
                "name": "Scheduling Puzzles",
                "slug": "scheduling"
              }
            ]
          },
          {
            "name": "Syllogism",
            "slug": "syllogism",
            "topics": [
              {
                "name": "Two-Statement Syllogism",
                "slug": "two-statement"
              },
              {
                "name": "Three-Statement Syllogism",
                "slug": "three-statement"
              },
              {
                "name": "Negative Conclusions",
                "slug": "negative-conclusions"
              },
              {
                "name": "Either-Or Cases",
                "slug": "either-or"
              },
              {
                "name": "Possibility Cases",
                "slug": "possibility"
              }
            ]
          },
          {
            "name": "Non-Verbal Reasoning",
            "slug": "non-verbal",
            "topics": [
              {
                "name": "Mirror Image",
                "slug": "mirror-image"
              },
              {
                "name": "Water Image",
                "slug": "water-image"
              },
              {
                "name": "Paper Folding and Cutting",
                "slug": "paper-fold-cut"
              },
              {
                "name": "Embedded Figures",
                "slug": "embedded-figures"
              },
              {
                "name": "Figure Completion",
                "slug": "figure-completion"
              },
              {
                "name": "Cube and Dice",
                "slug": "cube-dice"
              },
              {
                "name": "Counting of Figures",
                "slug": "counting-figures"
              }
            ]
          },
          {
            "name": "Venn Diagrams",
            "slug": "venn-diagrams",
            "topics": [
              {
                "name": "Venn Diagram — Finding Region",
                "slug": "venn-region"
              },
              {
                "name": "Venn Diagram — Syllogism",
                "slug": "venn-syllogism"
              },
              {
                "name": "Set-Based Problems",
                "slug": "set-problems"
              },
              {
                "name": "Three-Circle Venn Diagrams",
                "slug": "three-circle"
              }
            ]
          },
          {
            "name": "Statement and Conclusions",
            "slug": "statement-conclusions",
            "topics": [
              {
                "name": "Statement and Conclusion",
                "slug": "stmt-conclusion"
              },
              {
                "name": "Statement and Assumption",
                "slug": "stmt-assumption"
              },
              {
                "name": "Statement and Argument",
                "slug": "stmt-argument"
              },
              {
                "name": "Course of Action",
                "slug": "course-action"
              },
              {
                "name": "Cause and Effect",
                "slug": "cause-effect"
              }
            ]
          },
          {
            "name": "Clock and Calendar",
            "slug": "clock-calendar",
            "topics": [
              {
                "name": "Angle Between Clock Hands",
                "slug": "clock-angle"
              },
              {
                "name": "Time Gained/Lost by Clock",
                "slug": "clock-gain-loss"
              },
              {
                "name": "Day of the Week",
                "slug": "day-of-week"
              },
              {
                "name": "Odd Days Concept",
                "slug": "odd-days"
              },
              {
                "name": "Leap Year Problems",
                "slug": "leap-year"
              }
            ]
          }
        ]
      },
      {
        "name": "English Comprehension",
        "slug": "english-comprehension",
        "chapters": [
          {
            "name": "Reading Comprehension",
            "slug": "reading-comprehension",
            "topics": [
              {
                "name": "Factual Questions",
                "slug": "factual-questions"
              },
              {
                "name": "Inferential Questions",
                "slug": "inferential-questions"
              },
              {
                "name": "Vocabulary in Context",
                "slug": "vocab-context"
              },
              {
                "name": "Main Idea and Title",
                "slug": "main-idea-title"
              },
              {
                "name": "Tone and Attitude of Author",
                "slug": "tone-attitude"
              }
            ]
          },
          {
            "name": "Spot the Error",
            "slug": "spot-error",
            "topics": [
              {
                "name": "Subject-Verb Agreement Error",
                "slug": "sv-agreement"
              },
              {
                "name": "Tense Errors",
                "slug": "tense-errors"
              },
              {
                "name": "Article Errors",
                "slug": "article-errors"
              },
              {
                "name": "Preposition Errors",
                "slug": "preposition-errors"
              },
              {
                "name": "Pronoun Errors",
                "slug": "pronoun-errors"
              },
              {
                "name": "Conjunction and Punctuation Errors",
                "slug": "conj-punct"
              }
            ]
          },
          {
            "name": "Sentence Improvement",
            "slug": "sentence-improvement",
            "topics": [
              {
                "name": "Improving Grammatically Incorrect Sentences",
                "slug": "grammar-improvement"
              },
              {
                "name": "Improving Awkward Constructions",
                "slug": "awkward-improvement"
              },
              {
                "name": "Choice of Correct Word/Phrase",
                "slug": "word-phrase-choice"
              },
              {
                "name": "Sentence Restructuring",
                "slug": "restructuring"
              }
            ]
          },
          {
            "name": "Fill in the Blanks",
            "slug": "fill-blanks",
            "topics": [
              {
                "name": "Single Blank — Vocabulary",
                "slug": "single-blank-vocab"
              },
              {
                "name": "Single Blank — Grammar",
                "slug": "single-blank-grammar"
              },
              {
                "name": "Double Blank",
                "slug": "double-blank"
              },
              {
                "name": "Contextual Usage",
                "slug": "contextual-usage"
              }
            ]
          },
          {
            "name": "Synonyms and Antonyms",
            "slug": "synonyms-antonyms",
            "topics": [
              {
                "name": "Synonyms — Meaning and Usage",
                "slug": "synonyms"
              },
              {
                "name": "Antonyms",
                "slug": "antonyms"
              },
              {
                "name": "Contextual Synonyms",
                "slug": "contextual-synonyms"
              },
              {
                "name": "Word Pairs Confused",
                "slug": "confused-word-pairs"
              }
            ]
          },
          {
            "name": "One Word Substitution",
            "slug": "one-word-substitution",
            "topics": [
              {
                "name": "People and Professions",
                "slug": "people-professions"
              },
              {
                "name": "Places and Institutions",
                "slug": "places-institutions"
              },
              {
                "name": "Actions and Behaviors",
                "slug": "actions-behaviors"
              },
              {
                "name": "Scientific Terms",
                "slug": "scientific-terms"
              },
              {
                "name": "Phobias and Manias",
                "slug": "phobias-manias"
              }
            ]
          },
          {
            "name": "Idioms and Phrases",
            "slug": "idioms-phrases",
            "topics": [
              {
                "name": "Common Idioms and Their Meanings",
                "slug": "common-idioms"
              },
              {
                "name": "Phrasal Verbs",
                "slug": "phrasal-verbs"
              },
              {
                "name": "Proverbs",
                "slug": "proverbs"
              },
              {
                "name": "Idiomatic Prepositions",
                "slug": "idiomatic-prepositions"
              }
            ]
          },
          {
            "name": "Cloze Test",
            "slug": "cloze-test",
            "topics": [
              {
                "name": "Cloze Test — Grammar Based",
                "slug": "cloze-grammar"
              },
              {
                "name": "Cloze Test — Vocabulary Based",
                "slug": "cloze-vocabulary"
              },
              {
                "name": "Cloze Test — Mixed",
                "slug": "cloze-mixed"
              }
            ]
          },
          {
            "name": "Active and Passive Voice",
            "slug": "active-passive",
            "topics": [
              {
                "name": "Simple Tenses — Active to Passive",
                "slug": "simple-tense-ap"
              },
              {
                "name": "Perfect Tenses — Active to Passive",
                "slug": "perfect-tense-ap"
              },
              {
                "name": "Interrogative and Imperative Sentences",
                "slug": "interrogative-imperative"
              },
              {
                "name": "Modals in Passive Voice",
                "slug": "modals-passive"
              }
            ]
          },
          {
            "name": "Direct and Indirect Speech",
            "slug": "direct-indirect",
            "topics": [
              {
                "name": "Statements — Direct to Indirect",
                "slug": "statements-di"
              },
              {
                "name": "Questions — Direct to Indirect",
                "slug": "questions-di"
              },
              {
                "name": "Commands and Requests",
                "slug": "commands-requests"
              },
              {
                "name": "Exclamatory Sentences",
                "slug": "exclamatory"
              },
              {
                "name": "Reporting Verb Changes",
                "slug": "reporting-verb"
              }
            ]
          },
          {
            "name": "Sentence Rearrangement",
            "slug": "sentence-rearrangement",
            "topics": [
              {
                "name": "PARAJUMBLES — 4 Sentences",
                "slug": "parajumble-4"
              },
              {
                "name": "PARAJUMBLES — 5-6 Sentences",
                "slug": "parajumble-5-6"
              },
              {
                "name": "First and Last Sentence Fixed",
                "slug": "first-last-fixed"
              }
            ]
          },
          {
            "name": "Spelling Correction",
            "slug": "spelling-correction",
            "topics": [
              {
                "name": "Commonly Misspelt Words",
                "slug": "misspelt-words"
              },
              {
                "name": "Confusable Spellings",
                "slug": "confusable-spellings"
              },
              {
                "name": "Word Formation Rules",
                "slug": "word-formation"
              }
            ]
          }
        ]
      },
      {
        "name": "General Awareness",
        "slug": "general-awareness",
        "chapters": [
          {
            "name": "History",
            "slug": "history",
            "topics": [
              {
                "name": "Ancient Indian History",
                "slug": "ancient-india"
              },
              {
                "name": "Medieval Indian History",
                "slug": "medieval-india"
              },
              {
                "name": "Modern History — British Rule",
                "slug": "british-rule"
              },
              {
                "name": "Freedom Struggle and Movements",
                "slug": "freedom-struggle"
              },
              {
                "name": "Post-Independence India",
                "slug": "post-independence"
              },
              {
                "name": "World History — Key Events",
                "slug": "world-history"
              }
            ]
          },
          {
            "name": "Geography",
            "slug": "geography",
            "topics": [
              {
                "name": "Physical Features of India",
                "slug": "physical-india"
              },
              {
                "name": "Indian Rivers, Lakes and Dams",
                "slug": "rivers-lakes-dams"
              },
              {
                "name": "Indian Climate and Soils",
                "slug": "climate-soils"
              },
              {
                "name": "Natural Resources and Agriculture",
                "slug": "resources-agriculture"
              },
              {
                "name": "World Physical Geography",
                "slug": "world-physical"
              },
              {
                "name": "World Political Geography",
                "slug": "world-political"
              }
            ]
          },
          {
            "name": "Indian Polity and Constitution",
            "slug": "polity-constitution",
            "topics": [
              {
                "name": "Preamble and Key Features",
                "slug": "preamble-features"
              },
              {
                "name": "Fundamental Rights",
                "slug": "fundamental-rights"
              },
              {
                "name": "DPSP and Fundamental Duties",
                "slug": "dpsp-duties"
              },
              {
                "name": "Parliament — Lok Sabha and Rajya Sabha",
                "slug": "parliament"
              },
              {
                "name": "President, PM and Council of Ministers",
                "slug": "executive"
              },
              {
                "name": "Judiciary — Supreme Court and High Court",
                "slug": "judiciary"
              },
              {
                "name": "Constitutional Amendments",
                "slug": "constitutional-amendments"
              }
            ]
          },
          {
            "name": "Indian Economy",
            "slug": "indian-economy",
            "topics": [
              {
                "name": "National Income — GDP, GNP, NNP",
                "slug": "national-income"
              },
              {
                "name": "Budget — Revenue and Capital",
                "slug": "budget"
              },
              {
                "name": "Banking System and RBI",
                "slug": "banking-rbi"
              },
              {
                "name": "Monetary and Fiscal Policy",
                "slug": "monetary-fiscal"
              },
              {
                "name": "Five Year Plans and NITI Aayog",
                "slug": "plans-niti"
              },
              {
                "name": "Economic Schemes of Government",
                "slug": "economic-schemes"
              },
              {
                "name": "International Organisations — IMF, WB, WTO",
                "slug": "international-orgs"
              }
            ]
          },
          {
            "name": "General Science — Physics and Chemistry",
            "slug": "general-science-phy-chem",
            "topics": [
              {
                "name": "Laws of Motion and Gravitation",
                "slug": "motion-gravitation"
              },
              {
                "name": "Work, Energy and Power",
                "slug": "work-energy"
              },
              {
                "name": "Sound and Light",
                "slug": "sound-light"
              },
              {
                "name": "Electricity and Magnetism",
                "slug": "electricity-magnetism"
              },
              {
                "name": "Atomic Structure and Radioactivity",
                "slug": "atomic-radio"
              },
              {
                "name": "Chemical Reactions and Acids-Bases",
                "slug": "reactions-acids-bases"
              },
              {
                "name": "Metals and Non-Metals",
                "slug": "metals-nonmetals"
              },
              {
                "name": "Carbon Compounds",
                "slug": "carbon-compounds"
              }
            ]
          },
          {
            "name": "General Science — Biology",
            "slug": "general-science-biology",
            "topics": [
              {
                "name": "Cell and Cell Division",
                "slug": "cell"
              },
              {
                "name": "Nutrition and Digestive System",
                "slug": "nutrition-digestion"
              },
              {
                "name": "Circulatory and Respiratory System",
                "slug": "circulatory-respiratory"
              },
              {
                "name": "Nervous System and Sense Organs",
                "slug": "nervous-sense"
              },
              {
                "name": "Reproduction and Genetics",
                "slug": "reproduction-genetics"
              },
              {
                "name": "Plant Kingdom and Photosynthesis",
                "slug": "plant-photosynthesis"
              },
              {
                "name": "Diseases — Bacterial, Viral, Deficiency",
                "slug": "diseases"
              },
              {
                "name": "Human Body — Bones, Muscles, Glands",
                "slug": "human-body"
              }
            ]
          },
          {
            "name": "Computer and Technology",
            "slug": "computer-technology",
            "topics": [
              {
                "name": "Basic Computer Concepts",
                "slug": "basic-computer"
              },
              {
                "name": "Input and Output Devices",
                "slug": "io-devices"
              },
              {
                "name": "Memory — RAM, ROM, Storage",
                "slug": "memory-storage"
              },
              {
                "name": "Operating System and Software",
                "slug": "os-software"
              },
              {
                "name": "MS Office — Word, Excel, PowerPoint",
                "slug": "ms-office"
              },
              {
                "name": "Internet — Basics and Terminology",
                "slug": "internet"
              },
              {
                "name": "Cybersecurity — Malware, Firewall",
                "slug": "cybersecurity"
              },
              {
                "name": "Number Systems — Binary, Decimal, Hex",
                "slug": "number-systems"
              }
            ]
          },
          {
            "name": "Current Affairs",
            "slug": "current-affairs",
            "topics": [
              {
                "name": "National Current Events",
                "slug": "national-current"
              },
              {
                "name": "International Current Events",
                "slug": "international-current"
              },
              {
                "name": "Government Schemes and Policies",
                "slug": "govt-schemes"
              },
              {
                "name": "Summits, Conferences and Agreements",
                "slug": "summits-agreements"
              },
              {
                "name": "Appointments — Governors, Ministers, Heads",
                "slug": "appointments"
              }
            ]
          },
          {
            "name": "Sports, Awards and Books",
            "slug": "sports-awards-books",
            "topics": [
              {
                "name": "Sports — Recent Events and Champions",
                "slug": "sports-recent"
              },
              {
                "name": "Sports — Trophies and Tournaments",
                "slug": "sports-trophies"
              },
              {
                "name": "National Awards — Padma, Bharat Ratna",
                "slug": "national-awards"
              },
              {
                "name": "International Awards — Nobel, Booker",
                "slug": "international-awards"
              },
              {
                "name": "Books and Authors",
                "slug": "books-authors"
              }
            ]
          },
          {
            "name": "Art, Culture and Static GK",
            "slug": "art-culture-static",
            "topics": [
              {
                "name": "Indian Art Forms — Classical Dance and Music",
                "slug": "classical-art"
              },
              {
                "name": "Paintings and Architecture",
                "slug": "paintings-architecture"
              },
              {
                "name": "UNESCO Heritage Sites in India",
                "slug": "heritage-sites"
              },
              {
                "name": "Religious Sites and Festivals",
                "slug": "religious-festivals"
              },
              {
                "name": "Important Days and Events",
                "slug": "important-days"
              },
              {
                "name": "Countries, Capitals and Currencies",
                "slug": "countries-capitals"
              },
              {
                "name": "National Symbols of India",
                "slug": "national-symbols"
              }
            ]
          }
        ]
      }
    ]
  }
};

export const EXAM_LABEL = {
  "jee-main": "JEE Main",
  "jee-advanced": "JEE Advanced",
  "neet": "NEET",
  "ssc-cgl": "SSC CGL"
};
