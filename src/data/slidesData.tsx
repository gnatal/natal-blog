// data/slidesData.tsx
import React from 'react'
import type { SlideData } from '../types/carousel'
import { 
  DisciplineItem, 
  InsightBox, 
  PrincipleBox, 
  Quote, 
  Hashtags 
} from '../components/slides/SlideComponents'

export const slidesData: SlideData[] = [
  // Slide 1: Cover
  {
    id: 1,
    title: "The Stoic Developer",
    gradientClass: "slide-gradient-1",
    content: (
      <>
        <h1 className="text-6xl font-extrabold mb-8 text-center drop-shadow-lg">
          The Stoic Developer
        </h1>
        <p className="text-2xl text-center mb-8 font-light opacity-90">
          What Marcus Aurelius Taught Me About Writing Code Under Pressure
        </p>
        <p className="text-lg text-center opacity-80 font-medium mt-12">
          A 3-part series on applying ancient wisdom to modern software engineering
        </p>
        <Hashtags tags={['SoftwareEngineering', 'TechLeadership', 'StoicPhilosophy']} />
      </>
    )
  },

  // Slide 2: Three Disciplines
  {
    id: 2,
    title: "Three Disciplines",
    gradientClass: "slide-gradient-2",
    content: (
      <>
        <h2 className="text-5xl font-bold mb-12 text-center drop-shadow-lg">
          The Three Disciplines of the Stoic Developer
        </h2>
        
        <DisciplineItem
          title="Physics (Understanding the System)"
          description="Accept that complexity, bugs, and technical debt are the natural state of any living system. The best engineers work with this reality."
        />

        <DisciplineItem
          title="Logic (Discerning Truth from Noise)"
          description="Stop chasing every new framework. Filter signals from noise in your architecture decisions."
        />

        <DisciplineItem
          title="Ethics (Acting for the Common Good)"
          description="Write code for team success, refactor to serve the whole, mentor to strengthen the craft."
        />
      </>
    )
  },

  // Slide 3: Discipline of Desire
  {
    id: 3,
    title: "Discipline of Desire",
    gradientClass: "slide-gradient-3",
    content: (
      <>
        <h2 className="text-5xl font-bold mb-8 text-center drop-shadow-lg">
          The Discipline of Desire
        </h2>
        
        <Quote>
          Suffering comes from wanting reality to be different
        </Quote>

        <InsightBox
          label="The Problem:"
          text="The frustrated developer fighting legacy code suffers not because the code is bad, but because they desire it to be good."
        />

        <InsightBox
          label="The Stoic Solution:"
          text="Accept the current state, then methodically improve what you can control."
        />

        <InsightBox
          label="Focus on Virtue:"
          text="Find satisfaction in craft quality - the cleanly written function, thoughtful code review, patient explanation to a teammate."
        />
      </>
    )
  },

  // Slide 4: Code Like You're Mortal
  {
    id: 4,
    title: "Code Like You're Mortal",
    gradientClass: "slide-gradient-4",
    content: (
      <>
        <h2 className="text-5xl font-bold mb-8 text-center drop-shadow-lg">
          {`Code Like You're Mortal`}
        </h2>
        
        <Quote>
          You should go about every action as the last action, free from all vanity
        </Quote>

        <InsightBox
          label="The Uncomfortable Truth:"
          text="Your code will outlive you, but probably not by much. That React component? Legacy in 5 years. This isn't depressing - it's liberating."
        />

        <InsightBox
          label="What Changes:"
          text="Write with purpose, not vanity. Practice rational diligence over passionate haste. Care in small moments - every variable name, comment, and test matters."
        />
      </>
    )
  },

  // Slide 5: Three Principles
  {
    id: 5,
    title: "Three Principles",
    gradientClass: "slide-gradient-5",
    content: (
      <>
        <h2 className="text-4xl font-bold mb-10 text-center drop-shadow-lg">
          Three Stoic Principles for Modern Development
        </h2>

        <PrincipleBox
          number={1}
          title="Perfect Your Own Craft First"
          description="Before challenging a teammate's approach, audit your own code with the same scrutiny. Excellence earns authority."
        />

        <PrincipleBox
          number={2}
          title="Judge Ideas, Not Intentions"
          description="When reviewing code, stick to technical merit. Is it maintainable? Elegant? Speculation creates friction."
        />

        <PrincipleBox
          number={3}
          title="Work for Impact, Not Recognition"
          description="Refactor legacy code because it serves the team. The work itself is the reward - recognition is just a bonus."
        />
      </>
    )
  },

  // Slide 6: Call to Action
  {
    id: 6,
    title: "Your Next Commit",
    gradientClass: "slide-gradient-6",
    content: (
      <>
        <h2 className="text-5xl font-bold mb-8 text-center drop-shadow-lg">
          Your Next Commit
        </h2>
        
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 my-8">
          <p className="text-2xl text-center font-semibold leading-relaxed">
            The Stoic Developer codes with disciplined emotion, channeling passion while remaining unattached to outcomes beyond their control.
          </p>
        </div>

        <p className="text-xl text-center mt-12 font-medium">
          What would change about your next commit if you approached it as your last action, free from vanity and guided purely by reason?
        </p>

        <Hashtags tags={['SoftwareCraft', 'DeveloperMindset', 'TechPhilosophy', 'MarcusAurelius']} />
      </>
    )
  }
]