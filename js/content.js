/* =========================================================
   All words on the page live here.

   - CONTENT.en and CONTENT.ko have the SAME shape and order,
     so the two languages always line up.
   - A value written as { school: "...", company: "..." }
     changes with the Comparison slider. Any other value is
     shared by both versions.
   - `icon` names refer to the drawings in js/main.js.
   ========================================================= */

const CONTENT = {
  /* ---------------------------------------------------- English */
  en: {
    ui: {
      docTitle: "Give AI a clear assignment | AI 101",
      skip: "Skip to presentation",
      controlsTitle: "Presentation settings",
      viewLegend: "Comparison",
      viewSchool: "School",
      viewCompany: "Company",
      langLegend: "Language",
      footer: "A learning presentation. Not affiliated with Anthropic or OpenAI.",
      status: {
        school: "Now showing the school version, in English.",
        company: "Now showing the company version, in English.",
      },
    },

    opening: {
      eyebrow: "Start here",
      title: "Give AI a clear assignment and useful context.",
      body: "AI already has general knowledge, but it needs background about your particular task. Context is the information that helps it understand what you want.",
      icon: { school: "teacher", company: "employee" },
      metaphor: {
        school: "Think of working with AI as working with a teacher.",
        company: "Think of working with AI as working with an employee.",
      },
      metaphorNote: "This is a teaching metaphor, not a claim that AI is a person.",
      toolNote: "We use Claude as the main example. The same general ideas can help you understand ChatGPT, although their features differ.",
    },

    concepts: {
      eyebrow: "The main ideas",
      title: "Seven ideas, one familiar picture.",
      items: [
        {
          term: "Chat",
          icon: "chat",
          title: { school: "A teacher helping with an assignment", company: "An employee helping with an assignment" },
          body: {
            school: "Think of each chat as working with a teacher on an assignment. Explain what you need, then use questions and feedback to improve the result.",
            company: "Think of each chat as working with an employee on a task. Explain what you need, then use questions and feedback to improve the result.",
          },
        },
        {
          term: "Project",
          icon: { school: "classroom", company: "workspace" },
          title: { school: "A classroom", company: "A team workspace" },
          body: {
            school: "A classroom keeps reference materials and shared instructions available for the chats inside it.",
            company: "A team workspace keeps reference documents and shared instructions available for the chats inside it.",
          },
        },
        {
          term: "Files",
          icon: { school: "books", company: "documents" },
          title: { school: "Reference books", company: "Reference documents" },
          body: {
            school: "The teacher can consult the books you provide. Having access does not mean every book has been read.",
            company: "The employee can consult the documents you provide. Having access does not mean every document has been read.",
          },
        },
        {
          term: "Folder",
          icon: { school: "bookshelf", company: "cabinet" },
          title: { school: "A collection of books", company: "A filing cabinet" },
          body: {
            school: "Giving access to a folder lets the teacher consult its available materials. It does not automatically add everything to project knowledge.",
            company: "Giving access to a folder lets the employee consult its available documents. It does not automatically add everything to project knowledge.",
          },
        },
        {
          term: "Project instructions",
          icon: { school: "board", company: "guidelines" },
          title: { school: "Instructions on the classroom board", company: "Team working guidelines" },
          body: {
            school: "They describe how work in that classroom should be approached.",
            company: "They describe how work in that workspace should be approached.",
          },
        },
        {
          term: "Connector",
          icon: "apps",
          title: { school: "An app the teacher can use", company: "A work app the employee can use" },
          body: {
            school: "Connecting a service is like adding an app the teacher can use, such as Google Drive.",
            company: "Connecting a service is like adding a work app the employee can use, such as Google Drive.",
          },
          note: "What AI can read, create, or edit depends on the connector and the permissions you grant.",
        },
        {
          term: "Working outside a project",
          icon: { school: "outside", company: "briefcase" },
          title: { school: "Meeting the teacher outside the classroom", company: "A standalone assignment" },
          body: {
            school: "You can start an ordinary chat and bring the materials needed for that assignment.",
            company: "You can start an ordinary chat and provide the documents needed for that task.",
          },
        },
      ],
    },

    distinction: {
      eyebrow: "Shared vs. current",
      title: "Project materials are shared. The chat is about now.",
      caption: "Project materials are shared references. The chat is the discussion about the current assignment.",
      sharedTitle: { school: "Classroom (project)", company: "Team workspace (project)" },
      sharedItems: {
        school: [
          { icon: "bookshelf", label: "Bookshelf", sub: "Shared reference books" },
          { icon: "board", label: "Instruction board", sub: "Shared instructions" },
        ],
        company: [
          { icon: "documents", label: "Shared documents", sub: "Reference documents" },
          { icon: "guidelines", label: "Team guidelines", sub: "Shared instructions" },
        ],
      },
      flow: "Available to every chat in the project",
      person: { school: "teacher", company: "employee" },
      chatsTitle: "Chats",
      chats: {
        school: [
          { label: "Recycling slides", sub: "You and the teacher discuss this one assignment", current: true },
          { label: "Science quiz", sub: "A separate conversation" },
        ],
        company: [
          { label: "Monthly report", sub: "You and the employee discuss this one task", current: true },
          { label: "Client email", sub: "A separate conversation" },
        ],
      },
      currentTag: "This chat",
      note: "Each chat is its own conversation. Don't assume one chat knows everything said in another.",
    },

    guide: {
      eyebrow: "What should I use?",
      title: "Pick the simplest option that fits.",
      useWhen: "Use it for",
      likeLabel: "Like",
      options: [
        {
          name: "Ordinary chat",
          icon: { school: "outside", company: "briefcase" },
          when: "A one-off task where you can provide the necessary background directly.",
          like: { school: "Meeting the teacher outside the classroom", company: "A standalone assignment" },
        },
        {
          name: "Project",
          icon: { school: "classroom", company: "workspace" },
          when: "Ongoing work that repeatedly uses the same reference materials and instructions.",
          like: { school: "A classroom", company: "A team workspace" },
        },
        {
          name: "Connector",
          icon: "apps",
          when: "A task that needs access to another app or service.",
          like: { school: "An app the teacher can use", company: "A work app the employee can use" },
        },
      ],
      together: "These can work together: a chat inside a project can also use a connector.",
    },

    example: {
      eyebrow: "Practical example",
      title: "From vague to clear.",
      vagueLabel: "Vague request",
      vague: "Make a presentation.",
      clearLabel: "Clear request",
      // Each piece is either plain text, or { n, text } for a numbered ingredient.
      clear: [
        { n: 1, text: "Create a five-slide introduction to recycling" },
        " ",
        { n: 2, text: "for ten-year-olds." },
        " ",
        { n: 3, text: "Use the attached school guide as the main source." },
        " ",
        { n: 4, text: "Keep the language simple, include one classroom activity," },
        " and ",
        { n: 5, text: "follow the attached sample slide’s format: one short title and no more than three bullets per slide." },
      ],
      ingredientWord: "Ingredient",
      ingredientsTitle: "Five useful ingredients",
      ingredients: [
        { name: "Task", detail: "a five-slide presentation" },
        { name: "Audience", detail: "ten-year-olds" },
        { name: "Reference", detail: "the school guide" },
        { name: "Desired result", detail: "simple language and a classroom activity" },
        { name: "Example format", detail: "a sample slide" },
      ],
      sampleMetaphor: {
        school: "Show the teacher a sample assignment.",
        company: "Show the employee a sample deliverable.",
      },
      sampleWhy: "An example shows the shape you want, so AI doesn't have to guess.",
      slideTag: "Format example — not a verified answer",
      slideLabel: "Sample slide showing the format: one short title and three bullets.",
      slideTitle: "What is recycling?",
      slideBullets: ["Old things become new things", "Paper, cans, and plastic bottles", "Sort before you throw away"],
      slideCaption: "1 short title · up to 3 bullets",
    },

    context: {
      eyebrow: "Choose useful context",
      title: "Bring the right materials—not every material.",
      body: "Choose relevant, current sources. Tell AI which source matters most, and point out outdated information or conflicting documents.",
      icon: { school: "bookshelf", company: "cabinet" },
      metaphor: {
        school: "A classroom full of unrelated books does not make the assignment clearer.",
        company: "A filing cabinet full of unrelated documents does not make the task clearer.",
      },
      checks: ["Relevant", "Current", "Most important source named", "Outdated or conflicting parts pointed out"],
    },

    takeaway: {
      eyebrow: "Main takeaway",
      steps: ["Clear assignment", "Useful materials", "Feedback", "Review"],
      body: "You don’t need a perfect first request. Start with your goal, add useful background and an example, then refine the result together. Check the final work because AI can make mistakes.",
      followLabel: "Feedback example",
      follow: "“Make this shorter and explain the difficult words.”",
      reviewLabel: "Review example",
      review: "Check the names, dates, facts, and whether the result follows your instructions.",
    },

    more: {
      summary: "Learn more",
      hint: "Accuracy notes and sources",
      notesTitle: "Accuracy notes",
      notes: [
        "Teachers and employees are metaphors. A new chat is not literally a new person or automatically an independent autonomous agent.",
        "A new chat is not necessarily a blank slate. Memory may carry some information between chats, depending on the product and settings. Provide important task details explicitly.",
        "Shared project materials and full chat histories are different things. Do not assume every conversation has been carried into another chat.",
        "A project makes reference materials available; it does not guarantee that every file is consulted.",
        "Giving folder access does not automatically copy its contents into project knowledge.",
        "Connectors provide supported app capabilities within granted permissions. Reading access does not necessarily include creating or editing.",
        "Access to reference materials does not guarantee correct answers.",
        "Claude and ChatGPT differ in their features, availability, and permissions.",
      ],
      sourcesTitle: "Sources",
      sourcesIntro: "Official help pages, checked in October 2026. Features change, so check them again before relying on details.",
      newTab: "(opens in a new tab)",
      sources: [
        { title: "Claude Help Center — What are projects?", url: "https://support.claude.com/en/articles/9517075-what-are-projects", why: "Projects hold their own chats, knowledge, and instructions." },
        { title: "Claude Help Center — How can I create and manage projects?", url: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects", why: "Adding project knowledge and project instructions." },
        { title: "Claude Help Center — RAG for projects", url: "https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects", why: "Large projects look up relevant parts of their knowledge rather than reading everything at once." },
        { title: "Claude Help Center — Chat search and memory", url: "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context", why: "Memory and past-chat search depend on plan and settings." },
        { title: "Claude Help Center — Use connectors", url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities", why: "Connector tools have separate permissions, such as read-only or write." },
        { title: "Claude Help Center — Google Workspace connectors", url: "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors", why: "Example of what a Google Drive connector can do, and when it asks for approval." },
        { title: "OpenAI Help Center — Projects in ChatGPT", url: "https://help.openai.com/en/articles/10169521-projects-in-chatgpt", why: "ChatGPT has a similar idea, with its own features." },
      ],
    },
  },

  /* ---------------------------------------------------- 한국어 */
  ko: {
    ui: {
      docTitle: "AI에게 분명한 과제 주기 | AI 101",
      skip: "발표 내용으로 건너뛰기",
      controlsTitle: "발표 설정",
      viewLegend: "비교 방식",
      viewSchool: "학교",
      viewCompany: "회사",
      langLegend: "언어",
      footer: "학습용 발표 자료입니다. Anthropic 및 OpenAI와 관련이 없습니다.",
      status: {
        school: "학교 버전을 한국어로 보고 있습니다.",
        company: "회사 버전을 한국어로 보고 있습니다.",
      },
    },

    opening: {
      eyebrow: "시작하기",
      title: "AI에게 분명한 과제와 도움이 되는 맥락을 알려 주세요.",
      body: "AI는 이미 폭넓은 일반 지식을 갖고 있지만, 지금 하려는 일에 대한 배경은 따로 알려 줘야 합니다. 원하는 것을 이해하도록 돕는 이런 정보를 ‘맥락’이라고 합니다.",
      icon: { school: "teacher", company: "employee" },
      metaphor: {
        school: "AI와 함께하는 작업을 선생님과 함께하는 공부처럼 생각해 보세요.",
        company: "AI와 함께하는 작업을 직원과 함께하는 업무처럼 생각해 보세요.",
      },
      metaphorNote: "이해를 돕기 위한 비유일 뿐, AI가 사람이라는 뜻은 아닙니다.",
      toolNote: "이 자료는 Claude를 주된 예로 듭니다. ChatGPT도 같은 원리로 이해하는 데 도움이 되지만, 세부 기능은 서로 다릅니다.",
    },

    concepts: {
      eyebrow: "핵심 개념",
      title: "일곱 가지 개념을 익숙한 장면으로.",
      items: [
        {
          term: "채팅",
          icon: "chat",
          title: { school: "과제를 도와주는 선생님", company: "업무를 도와주는 직원" },
          body: {
            school: "채팅 하나를 선생님과 과제 하나를 함께하는 시간이라고 생각해 보세요. 필요한 것을 설명한 뒤, 질문과 피드백을 주고받으며 결과를 다듬어 가세요.",
            company: "채팅 하나를 직원과 업무 하나를 함께하는 시간이라고 생각해 보세요. 필요한 것을 설명한 뒤, 질문과 피드백을 주고받으며 결과를 다듬어 가세요.",
          },
        },
        {
          term: "프로젝트",
          icon: { school: "classroom", company: "workspace" },
          title: { school: "교실", company: "팀 업무 공간" },
          body: {
            school: "교실에는 참고 자료와 공통 지침이 늘 준비되어 있어, 그 안에서 나누는 채팅마다 이를 활용할 수 있습니다.",
            company: "팀 업무 공간에는 참고 문서와 공통 지침이 늘 준비되어 있어, 그 안에서 나누는 채팅마다 이를 활용할 수 있습니다.",
          },
        },
        {
          term: "파일",
          icon: { school: "books", company: "documents" },
          title: { school: "참고 도서", company: "참고 문서" },
          body: {
            school: "선생님은 여러분이 건넨 책을 찾아볼 수 있습니다. 하지만 책이 있다고 해서 모든 책을 다 읽었다는 뜻은 아닙니다.",
            company: "직원은 여러분이 건넨 문서를 찾아볼 수 있습니다. 하지만 문서가 있다고 해서 모든 문서를 다 읽었다는 뜻은 아닙니다.",
          },
        },
        {
          term: "폴더",
          icon: { school: "bookshelf", company: "cabinet" },
          title: { school: "책 모음", company: "서류함" },
          body: {
            school: "폴더 접근 권한을 주면 선생님이 그 안의 자료를 찾아볼 수 있습니다. 그렇다고 모든 내용이 프로젝트 지식에 자동으로 추가되지는 않습니다.",
            company: "폴더 접근 권한을 주면 직원이 그 안의 문서를 찾아볼 수 있습니다. 그렇다고 모든 내용이 프로젝트 지식에 자동으로 추가되지는 않습니다.",
          },
        },
        {
          term: "프로젝트 지침",
          icon: { school: "board", company: "guidelines" },
          title: { school: "교실 칠판의 안내 사항", company: "팀 업무 지침" },
          body: {
            school: "그 교실에서 과제를 어떤 방식으로 해 나갈지 알려 줍니다.",
            company: "그 업무 공간에서 일을 어떤 방식으로 진행할지 알려 줍니다.",
          },
        },
        {
          term: "커넥터",
          icon: "apps",
          title: { school: "선생님이 쓸 수 있는 앱", company: "직원이 쓸 수 있는 업무용 앱" },
          body: {
            school: "서비스를 연결하는 것은 Google Drive처럼 선생님이 쓸 수 있는 앱을 하나 더해 주는 것과 같습니다.",
            company: "서비스를 연결하는 것은 Google Drive처럼 직원이 쓸 수 있는 업무용 앱을 하나 더해 주는 것과 같습니다.",
          },
          note: "AI가 무엇을 읽고, 만들고, 수정할 수 있는지는 커넥터와 여러분이 허용한 권한에 따라 달라집니다.",
        },
        {
          term: "프로젝트 밖에서 작업하기",
          icon: { school: "outside", company: "briefcase" },
          title: { school: "교실 밖에서 선생님 만나기", company: "따로 맡기는 단독 업무" },
          body: {
            school: "일반 채팅을 시작하고, 그 과제에 필요한 자료를 직접 가져가면 됩니다.",
            company: "일반 채팅을 시작하고, 그 업무에 필요한 문서를 직접 건네면 됩니다.",
          },
        },
      ],
    },

    distinction: {
      eyebrow: "공유 자료와 지금의 대화",
      title: "프로젝트 자료는 함께 쓰고, 채팅은 지금의 일을 다룹니다.",
      caption: "프로젝트 자료는 함께 쓰는 참고 자료이고, 채팅은 지금 하고 있는 과제에 대한 대화입니다.",
      sharedTitle: { school: "교실 (프로젝트)", company: "팀 업무 공간 (프로젝트)" },
      sharedItems: {
        school: [
          { icon: "bookshelf", label: "책장", sub: "함께 보는 참고 도서" },
          { icon: "board", label: "안내 칠판", sub: "공통 지침" },
        ],
        company: [
          { icon: "documents", label: "공유 문서", sub: "참고 문서" },
          { icon: "guidelines", label: "팀 지침", sub: "공통 지침" },
        ],
      },
      flow: "프로젝트 안의 모든 채팅에서 활용 가능",
      person: { school: "teacher", company: "employee" },
      chatsTitle: "채팅",
      chats: {
        school: [
          { label: "재활용 발표 자료", sub: "선생님과 이 과제 하나만 이야기합니다", current: true },
          { label: "과학 퀴즈", sub: "별개의 대화" },
        ],
        company: [
          { label: "월간 보고서", sub: "직원과 이 업무 하나만 이야기합니다", current: true },
          { label: "고객 이메일", sub: "별개의 대화" },
        ],
      },
      currentTag: "지금 이 채팅",
      note: "채팅은 각각 따로 이어지는 대화입니다. 다른 채팅에서 나눈 이야기를 이 채팅이 모두 알고 있다고 생각하지 마세요.",
    },

    guide: {
      eyebrow: "무엇을 쓸까요?",
      title: "상황에 맞는 가장 간단한 방법을 고르세요.",
      useWhen: "이럴 때",
      likeLabel: "비유",
      options: [
        {
          name: "일반 채팅",
          icon: { school: "outside", company: "briefcase" },
          when: "필요한 배경 정보를 바로 알려 줄 수 있는 한 번짜리 작업",
          like: { school: "교실 밖에서 선생님 만나기", company: "따로 맡기는 단독 업무" },
        },
        {
          name: "프로젝트",
          icon: { school: "classroom", company: "workspace" },
          when: "같은 참고 자료와 지침을 계속 활용하는 이어지는 작업",
          like: { school: "교실", company: "팀 업무 공간" },
        },
        {
          name: "커넥터",
          icon: "apps",
          when: "다른 앱이나 서비스에 접근해야 하는 작업",
          like: { school: "선생님이 쓸 수 있는 앱", company: "직원이 쓸 수 있는 업무용 앱" },
        },
      ],
      together: "세 가지는 함께 쓸 수 있습니다. 프로젝트 안의 채팅에서도 커넥터를 사용할 수 있어요.",
    },

    example: {
      eyebrow: "실전 예시",
      title: "막연한 요청을 분명한 요청으로.",
      vagueLabel: "막연한 요청",
      vague: "발표 자료 만들어 줘.",
      clearLabel: "분명한 요청",
      clear: [
        { n: 2, text: "10살 어린이를 위한" },
        " ",
        { n: 1, text: "재활용 소개 발표 자료를 슬라이드 5장으로 만들어 주세요." },
        " ",
        { n: 3, text: "첨부한 학교 안내서를 주요 자료로 사용해 주세요." },
        " ",
        { n: 4, text: "쉬운 말로 쓰고, 교실 활동을 하나 넣어 주세요." },
        " ",
        { n: 5, text: "첨부한 예시 슬라이드 형식에 맞춰, 슬라이드마다 짧은 제목 하나와 글머리 기호 3개 이하로 구성해 주세요." },
      ],
      ingredientWord: "재료",
      ingredientsTitle: "좋은 요청의 다섯 가지 재료",
      ingredients: [
        { name: "과제", detail: "슬라이드 5장짜리 발표 자료" },
        { name: "대상", detail: "10살 어린이" },
        { name: "참고 자료", detail: "학교 안내서" },
        { name: "원하는 결과", detail: "쉬운 말과 교실 활동 하나" },
        { name: "예시 형식", detail: "예시 슬라이드" },
      ],
      sampleMetaphor: {
        school: "선생님께 예시 과제를 보여 드리세요.",
        company: "직원에게 예시 결과물을 보여 주세요.",
      },
      sampleWhy: "예시를 보여 주면 원하는 모양을 AI가 짐작할 필요가 없습니다.",
      slideTag: "형식 예시 · 검증된 답이 아닙니다",
      slideLabel: "형식을 보여 주는 예시 슬라이드: 짧은 제목 하나와 글머리 기호 세 개.",
      slideTitle: "재활용이란?",
      slideBullets: ["쓰던 물건이 새 물건으로 다시 태어나요", "종이, 캔, 플라스틱 병", "버리기 전에 분리해요"],
      slideCaption: "짧은 제목 1개 · 글머리 기호 최대 3개",
    },

    context: {
      eyebrow: "알맞은 맥락 고르기",
      title: "모든 자료가 아니라, 알맞은 자료를 가져오세요.",
      body: "관련 있고 최신인 자료를 고르세요. 어떤 자료가 가장 중요한지 알려 주고, 오래된 정보나 서로 맞지 않는 문서가 있다면 짚어 주세요.",
      icon: { school: "bookshelf", company: "cabinet" },
      metaphor: {
        school: "관계없는 책으로 가득한 교실이 과제를 더 분명하게 만들어 주지는 않습니다.",
        company: "관계없는 문서로 가득한 서류함이 업무를 더 분명하게 만들어 주지는 않습니다.",
      },
      checks: ["관련 있는 자료", "최신 자료", "가장 중요한 자료 알려 주기", "오래되거나 충돌하는 부분 짚어 주기"],
    },

    takeaway: {
      eyebrow: "핵심 정리",
      steps: ["분명한 과제", "도움이 되는 자료", "피드백", "검토"],
      body: "처음부터 완벽하게 요청할 필요는 없습니다. 목표부터 말하고, 도움이 되는 배경과 예시를 더한 뒤, 함께 결과를 다듬어 가세요. AI도 실수할 수 있으니 최종 결과물은 꼭 확인하세요.",
      followLabel: "피드백 예시",
      follow: "“좀 더 짧게 줄이고, 어려운 단어는 풀어서 설명해 줘.”",
      reviewLabel: "검토 예시",
      review: "이름, 날짜, 사실 관계, 그리고 요청한 대로 만들어졌는지 확인하세요.",
    },

    more: {
      summary: "더 알아보기",
      hint: "정확한 이해를 위한 참고 사항과 출처",
      notesTitle: "참고 사항",
      notes: [
        "선생님과 직원은 비유입니다. 새 채팅이 실제로 새로운 사람이 되거나, 스스로 알아서 움직이는 독립된 AI 에이전트가 되는 것은 아닙니다.",
        "새 채팅이 항상 백지상태인 것은 아닙니다. 제품과 설정에 따라 메모리 기능이 일부 정보를 다른 채팅으로 이어 줄 수 있습니다. 그래도 중요한 작업 정보는 직접 알려 주세요.",
        "공유된 프로젝트 자료와 전체 채팅 기록은 서로 다릅니다. 모든 대화 내용이 다른 채팅으로 이어졌다고 생각하지 마세요.",
        "프로젝트는 참고 자료를 쓸 수 있게 해 줄 뿐, 모든 파일을 반드시 참고한다고 보장하지는 않습니다.",
        "폴더 접근 권한을 준다고 해서 그 안의 내용이 프로젝트 지식에 자동으로 복사되지는 않습니다.",
        "커넥터는 허용된 권한 안에서, 지원되는 앱 기능만 쓸 수 있게 해 줍니다. 읽기 권한이 있다고 해서 만들기나 수정 권한까지 있는 것은 아닙니다.",
        "참고 자료에 접근할 수 있다고 해서 답이 항상 정확한 것은 아닙니다.",
        "Claude와 ChatGPT는 기능, 이용 가능 범위, 권한 설정이 서로 다릅니다.",
      ],
      sourcesTitle: "출처",
      sourcesIntro: "2026년 10월에 확인한 공식 도움말입니다(영문). 기능은 바뀔 수 있으니, 세부 내용은 다시 확인하세요.",
      newTab: "(새 탭에서 열림)",
      sources: [
        { title: "Claude Help Center — What are projects?", url: "https://support.claude.com/en/articles/9517075-what-are-projects", why: "프로젝트에는 자체 채팅, 지식, 지침이 있습니다." },
        { title: "Claude Help Center — How can I create and manage projects?", url: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects", why: "프로젝트 지식과 프로젝트 지침을 추가하는 방법." },
        { title: "Claude Help Center — RAG for projects", url: "https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects", why: "규모가 큰 프로젝트는 모든 자료를 한 번에 읽지 않고, 관련 있는 부분을 찾아 활용합니다." },
        { title: "Claude Help Center — Chat search and memory", url: "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context", why: "메모리와 지난 채팅 검색은 요금제와 설정에 따라 다릅니다." },
        { title: "Claude Help Center — Use connectors", url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities", why: "커넥터 기능마다 읽기 전용, 쓰기 등 권한이 따로 있습니다." },
        { title: "Claude Help Center — Google Workspace connectors", url: "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors", why: "Google Drive 커넥터로 할 수 있는 일과 승인을 요청하는 경우." },
        { title: "OpenAI Help Center — Projects in ChatGPT", url: "https://help.openai.com/en/articles/10169521-projects-in-chatgpt", why: "ChatGPT에도 비슷한 개념이 있지만, 기능은 따로 정해져 있습니다." },
      ],
    },
  },
};
