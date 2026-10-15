/* =========================================================
   All words on the page live here.

   - CONTENT.en and CONTENT.ko have the SAME shape and order,
     so the two languages always line up.
   - A value written as { school: "...", company: "..." }
     changes with the Comparison switch. Any other value is
     shared by both versions.
   - `icon` names refer to the drawings in js/icons.js.
   - Text wrapped in ==double equals== is a key phrase: it is
     shown in bold and turns from grey to black as the section
     comes into view.
   - Keep sentences short and words everyday: the readers are
     beginners.
   ========================================================= */

const CONTENT = {
  /* ---------------------------------------------------- English */
  en: {
    ui: {
      docTitle: "AI-101",
      skip: "Skip to content",
      controlsTitle: "Settings",
      viewLegend: "Comparison",
      viewSchool: "School",
      viewCompany: "Company",
      langLegend: "Language",
      footer: "AI-101 · A simple guide to AI for the classroom. Not affiliated with Anthropic or OpenAI.",
      status: {
        school: "The page is now in English.",
        company: "Now showing the company version, in English.",
      },
      // Short names for the section menu at the top
      nav: {
        label: "Sections",
        jump: "Jump to a section",
        contents: "Go to section",
        announce: "Section {n} of {total}: {name}",
        sections: ["Start", "Main ideas", "Chat vs. project", "What to use", "Example", "Materials", "Remember", "Try it", "Learn more"],
      },
    },

    opening: {
      eyebrow: "Start here",
      title: "Work with AI like you work with a teacher.",
      body: "AI ==already knows a lot==. But it ==doesn’t know your task== until you tell it. The details you share are called context.",
      icon: { school: "teacher", company: "employee" },
      metaphor: {
        school: "A teacher helps more when you explain the assignment and bring your materials. So does AI.",
        company: "An employee helps more when you explain the task and share your documents. So does AI.",
      },
      metaphorNote: "This is just a comparison. AI is not a person.",
      toolNote: "Our examples use Claude. ChatGPT works in a similar way, but its features are different.",
    },

    concepts: {
      eyebrow: "The main ideas",
      title: "Seven ideas you’ll see in Claude.",
      items: [
        {
          term: "Chat",
          icon: "chat",
          title: { school: "A teacher helping with one assignment", company: "An employee helping with one task" },
          body: {
            school: "Each chat is like working with a teacher on one assignment. Say what you need. Then ask questions and give feedback to make it better.",
            company: "Each chat is like working with an employee on one task. Say what you need. Then ask questions and give feedback to make it better.",
          },
        },
        {
          term: "Project",
          icon: { school: "classroom", company: "workspace" },
          title: { school: "A classroom", company: "A team workspace" },
          body: {
            school: "A classroom keeps shared books and instructions in one place. Every chat inside it can use them.",
            company: "A team workspace keeps shared documents and instructions in one place. Every chat inside it can use them.",
          },
        },
        {
          term: "Files",
          icon: { school: "books", company: "documents" },
          title: { school: "Reference books", company: "Reference documents" },
          body: {
            school: "The teacher can look things up in the books you give. But that ==doesn’t mean every book has been read==.",
            company: "The employee can look things up in the documents you give. But that ==doesn’t mean every document has been read==.",
          },
        },
        {
          term: "Folder",
          icon: { school: "bookshelf", company: "cabinet" },
          title: { school: "A shelf of books", company: "A filing cabinet" },
          body: {
            school: "Sharing a folder lets the teacher look at what’s inside. It ==doesn’t copy everything into the project==.",
            company: "Sharing a folder lets the employee look at what’s inside. It ==doesn’t copy everything into the project==.",
          },
        },
        {
          term: "Project instructions",
          icon: { school: "board", company: "guidelines" },
          title: { school: "Rules on the classroom board", company: "The team’s ground rules" },
          body: {
            school: "They tell how work in this classroom should be done.",
            company: "They tell how work in this workspace should be done.",
          },
        },
        {
          term: "Connector",
          icon: "apps",
          title: { school: "An app the teacher can use", company: "A work app the employee can use" },
          body: {
            school: "Connecting a service, like Google Drive, is like giving the teacher an app to use.",
            company: "Connecting a service, like Google Drive, is like giving the employee a work app to use.",
          },
          note: "What AI can read, make, or change depends on the connector and ==what you allow==.",
        },
        {
          term: "Working outside a project",
          icon: { school: "outside", company: "briefcase" },
          title: { school: "Meeting the teacher outside class", company: "A one-off task" },
          body: {
            school: "Start a normal chat and bring what you need for that assignment.",
            company: "Start a normal chat and share what you need for that task.",
          },
        },
      ],
    },

    distinction: {
      eyebrow: "Shared vs. this chat",
      title: "The project is shared. The chat is for now.",
      caption: "Project materials are ==shared by every chat==. A chat is the talk about ==one assignment==.",
      sharedTitle: { school: "Classroom (project)", company: "Team workspace (project)" },
      sharedItems: {
        school: [
          { icon: "bookshelf", label: "Bookshelf", sub: "Books everyone can use" },
          { icon: "board", label: "Instruction board", sub: "Rules for everyone" },
        ],
        company: [
          { icon: "documents", label: "Shared documents", sub: "Files everyone can use" },
          { icon: "guidelines", label: "Team guidelines", sub: "Rules for everyone" },
        ],
      },
      flow: "Every chat in the project can use these",
      person: { school: "teacher", company: "employee" },
      chatsTitle: "Chats",
      chats: {
        school: [
          { label: "Recycling slides", sub: "You and the teacher talk about this one assignment", current: true },
          { label: "Science quiz", sub: "A different chat" },
        ],
        company: [
          { label: "Monthly report", sub: "You and the employee talk about this one task", current: true },
          { label: "Client email", sub: "A different chat" },
        ],
      },
      currentTag: "This chat",
      note: "Each chat is separate. A chat may not know what you said in another chat.",
    },

    guide: {
      eyebrow: "What should I use?",
      title: "Pick the simplest one that works.",
      useWhen: "Use it for",
      likeLabel: "Like",
      options: [
        {
          name: "Normal chat",
          icon: { school: "outside", company: "briefcase" },
          when: "A one-time task where you can explain everything yourself.",
          like: { school: "Meeting the teacher outside class", company: "A one-off task" },
        },
        {
          name: "Project",
          icon: { school: "classroom", company: "workspace" },
          when: "Ongoing work that uses the same materials and instructions again and again.",
          like: { school: "A classroom", company: "A team workspace" },
        },
        {
          name: "Connector",
          icon: "apps",
          when: "A task that needs another app or service.",
          like: { school: "An app the teacher can use", company: "A work app the employee can use" },
        },
      ],
      together: "You can mix them. A chat in a project ==can use a connector too==.",
    },

    example: {
      eyebrow: "Example",
      title: "From unclear to clear.",
      vagueLabel: "Unclear request",
      copy: "Copy prompt",
      copied: "Copied",
      copiedNote: "Prompt copied. Paste it into Claude to try it.",
      copyFailed: "Couldn’t copy. Select the text and copy it instead.",
      vague: "Make a presentation.",
      clearLabel: "Clear request",
      // Each piece is either plain text, or { n, text } for one of the five numbered parts.
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
      ingredientWord: "Part",
      ingredientsTitle: "Five things that help",
      ingredients: [
        { name: "Task", detail: "a five-slide presentation" },
        { name: "Who it’s for", detail: "ten-year-olds" },
        { name: "Source", detail: "the school guide" },
        { name: "What you want", detail: "simple words and a class activity" },
        { name: "Example", detail: "a sample slide" },
      ],
      sampleMetaphor: {
        school: "Show the teacher a sample assignment.",
        company: "Show the employee a sample of finished work.",
      },
      sampleWhy: "An example shows what you want, so AI doesn’t have to guess.",
      slideTag: "Format example — not a checked answer",
      slideLabel: "Sample slide showing the format: one short title and three bullets.",
      slideTitle: "What is recycling?",
      slideBullets: ["Old things become new things", "Paper, cans, and plastic bottles", "Sort before you throw away"],
      slideCaption: "1 short title · up to 3 bullets",
    },

    context: {
      eyebrow: "Choose your materials",
      title: "Bring the right materials, not all of them.",
      body: "Pick materials that are ==on topic and up to date==. Say ==which one matters most==. Point out anything old, or anything that disagrees.",
      icon: { school: "bookshelf", company: "cabinet" },
      metaphor: {
        school: "A room full of unrelated books won’t make the assignment clearer.",
        company: "A cabinet full of unrelated files won’t make the task clearer.",
      },
      checks: ["On topic", "Up to date", "Most important one named", "Old or mixed-up parts pointed out"],
    },

    takeaway: {
      eyebrow: "Remember this",
      steps: ["Clear task", "Useful materials", "Feedback", "Check"],
      body: "Your first request doesn’t have to be perfect. Start with your goal. Add materials and an example. Then improve it together. ==Always check the result==, because AI can make mistakes.",
      followLabel: "Feedback example",
      follow: "“Make this shorter and explain the hard words.”",
      reviewLabel: "Check example",
      review: "Check names, dates and facts, and make sure it followed your instructions.",
    },

    tryIt: {
      eyebrow: "Your turn",
      title: "Try it yourself.",
      body: "Open Claude, paste the example, and see what you get. Then ==give it feedback==, just like you would with a teacher.",
      copyTitle: "Copy the example",
      copyText: "Copy the clear request from the example above.",
      copyButton: "Copy example prompt",
      openTitle: "Open Claude",
      openText: "Open Claude in a new tab and paste it in.",
      openButton: "Open Claude",
      feedbackTitle: "Give feedback",
      feedbackText: "Read the result and say what to change.",
      feedbackExample: "“Make it shorter.”",
      note: "You’ll need to sign in to Claude. A free account works.",
    },

    more: {
      summary: "Learn more",
      hint: "Good to know, and sources",
      notesTitle: "Good to know",
      notes: [
        "The teacher and the employee are just comparisons. A new chat is not a new person, and it doesn’t work on its own.",
        "A new chat doesn’t always start from zero. Depending on the app and your settings, memory may carry some details over. Still, say the important things again.",
        "Shared project materials are not the same as past chats. Don’t expect one chat to know everything from another.",
        "A project makes materials available. It doesn’t promise that every file is used.",
        "Sharing a folder doesn’t copy what’s inside into the project.",
        "Connectors only do what the app supports and what you allow. Being able to read doesn’t always mean being able to create or edit.",
        "Having materials doesn’t guarantee correct answers.",
        "Claude and ChatGPT have different features, plans and settings.",
      ],
      sourcesTitle: "Sources",
      sourcesIntro: "Official help pages, checked in October 2026. Things change, so check again for details.",
      newTab: "(opens in a new tab)",
      sources: [
        { title: "Claude Help Center — What are projects?", url: "https://support.claude.com/en/articles/9517075-what-are-projects", why: "Projects have their own chats, files and instructions." },
        { title: "Claude Help Center — How can I create and manage projects?", url: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects", why: "How to add project files and instructions." },
        { title: "Claude Help Center — RAG for projects", url: "https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects", why: "Big projects look up the parts they need instead of reading everything." },
        { title: "Claude Help Center — Chat search and memory", url: "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context", why: "Memory and searching past chats depend on your plan and settings." },
        { title: "Claude Help Center — Use connectors", url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities", why: "Each connector tool has its own permission, like read-only or write." },
        { title: "Claude Help Center — Google Workspace connectors", url: "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors", why: "What the Google Drive connector can do, and when it asks first." },
        { title: "OpenAI Help Center — Projects in ChatGPT", url: "https://help.openai.com/en/articles/10169521-projects-in-chatgpt", why: "ChatGPT has a similar idea, with its own features." },
      ],
    },
  },

  /* ---------------------------------------------------- 한국어 */
  ko: {
    ui: {
      docTitle: "AI-101",
      skip: "본문으로 건너뛰기",
      controlsTitle: "설정",
      viewLegend: "비교 방식",
      viewSchool: "학교",
      viewCompany: "회사",
      langLegend: "언어",
      footer: "AI-101 · 교실을 위한 쉬운 AI 안내서예요. Anthropic 및 OpenAI와 관련이 없습니다.",
      status: {
        school: "이제 한국어로 보고 있습니다.",
        company: "회사 버전을 한국어로 보고 있습니다.",
      },
      // 상단 섹션 메뉴에 쓰는 짧은 이름
      nav: {
        label: "섹션",
        jump: "섹션으로 바로 가기",
        contents: "섹션 바로가기",
        announce: "{total}개 중 {n}번째 섹션: {name}",
        sections: ["시작", "핵심 개념", "채팅과 프로젝트", "무엇을 쓸까", "예시", "자료 고르기", "기억하기", "해 보기", "더 알아보기"],
      },
    },

    opening: {
      eyebrow: "시작하기",
      title: "선생님과 함께하듯 AI와 함께해 보세요.",
      body: "AI는 ==이미 많은 것을 알아요==. 하지만 여러분이 알려 주기 전에는 ==여러분의 과제를 몰라요==. 이렇게 알려 주는 정보를 ‘맥락’이라고 해요.",
      icon: { school: "teacher", company: "employee" },
      metaphor: {
        school: "과제를 잘 설명하고 자료를 함께 가져올수록 선생님은 더 잘 도와줘요. AI도 마찬가지예요.",
        company: "할 일을 잘 설명하고 자료를 함께 줄수록 직원은 더 잘 도와줘요. AI도 마찬가지예요.",
      },
      metaphorNote: "이해를 돕기 위한 비유일 뿐이에요. AI는 사람이 아니에요.",
      toolNote: "예시는 Claude를 기준으로 해요. ChatGPT도 비슷하게 쓰지만, 기능은 서로 달라요.",
    },

    concepts: {
      eyebrow: "핵심 개념",
      title: "Claude에서 만나는 일곱 가지 개념.",
      items: [
        {
          term: "채팅",
          icon: "chat",
          title: { school: "과제 하나를 도와주는 선생님", company: "업무 하나를 도와주는 직원" },
          body: {
            school: "채팅 하나는 선생님과 과제 하나를 함께하는 시간이에요. 필요한 것을 말하고, 질문과 피드백으로 결과를 더 좋게 만들어 가세요.",
            company: "채팅 하나는 직원과 업무 하나를 함께하는 시간이에요. 필요한 것을 말하고, 질문과 피드백으로 결과를 더 좋게 만들어 가세요.",
          },
        },
        {
          term: "프로젝트",
          icon: { school: "classroom", company: "workspace" },
          title: { school: "교실", company: "팀 업무 공간" },
          body: {
            school: "교실에는 함께 쓰는 책과 안내 사항이 모여 있어요. 교실 안의 모든 채팅이 이것을 쓸 수 있어요.",
            company: "팀 업무 공간에는 함께 쓰는 문서와 안내 사항이 모여 있어요. 그 안의 모든 채팅이 이것을 쓸 수 있어요.",
          },
        },
        {
          term: "파일",
          icon: { school: "books", company: "documents" },
          title: { school: "참고 도서", company: "참고 문서" },
          body: {
            school: "선생님은 여러분이 준 책에서 찾아볼 수 있어요. 하지만 ==모든 책을 다 읽었다는 뜻은 아니에요==.",
            company: "직원은 여러분이 준 문서에서 찾아볼 수 있어요. 하지만 ==모든 문서를 다 읽었다는 뜻은 아니에요==.",
          },
        },
        {
          term: "폴더",
          icon: { school: "bookshelf", company: "cabinet" },
          title: { school: "책장", company: "서류함" },
          body: {
            school: "폴더를 공유하면 선생님이 그 안을 볼 수 있어요. 하지만 ==모든 내용이 프로젝트에 복사되지는 않아요==.",
            company: "폴더를 공유하면 직원이 그 안을 볼 수 있어요. 하지만 ==모든 내용이 프로젝트에 복사되지는 않아요==.",
          },
        },
        {
          term: "프로젝트 지침",
          icon: { school: "board", company: "guidelines" },
          title: { school: "교실 칠판의 규칙", company: "팀 업무 규칙" },
          body: {
            school: "이 교실에서 과제를 어떻게 할지 알려 줘요.",
            company: "이 업무 공간에서 일을 어떻게 할지 알려 줘요.",
          },
        },
        {
          term: "커넥터",
          icon: "apps",
          title: { school: "선생님이 쓰는 앱", company: "직원이 쓰는 업무용 앱" },
          body: {
            school: "Google Drive 같은 서비스를 연결하는 것은 선생님에게 쓸 수 있는 앱을 주는 것과 같아요.",
            company: "Google Drive 같은 서비스를 연결하는 것은 직원에게 업무용 앱을 주는 것과 같아요.",
          },
          note: "AI가 무엇을 읽고, 만들고, 바꿀 수 있는지는 커넥터와 ==여러분이 허락한 범위==에 따라 달라요.",
        },
        {
          term: "프로젝트 밖에서 작업하기",
          icon: { school: "outside", company: "briefcase" },
          title: { school: "교실 밖에서 선생님 만나기", company: "한 번만 하는 업무" },
          body: {
            school: "일반 채팅을 열고, 그 과제에 필요한 자료를 직접 가져가세요.",
            company: "일반 채팅을 열고, 그 업무에 필요한 문서를 직접 건네세요.",
          },
        },
      ],
    },

    distinction: {
      eyebrow: "공유 자료와 이 채팅",
      title: "프로젝트는 함께 쓰고, 채팅은 지금을 위한 거예요.",
      caption: "프로젝트 자료는 ==모든 채팅이 함께 써요==. 채팅은 ==과제 하나에 대한 대화==예요.",
      sharedTitle: { school: "교실 (프로젝트)", company: "팀 업무 공간 (프로젝트)" },
      sharedItems: {
        school: [
          { icon: "bookshelf", label: "책장", sub: "모두가 보는 책" },
          { icon: "board", label: "안내 칠판", sub: "모두를 위한 규칙" },
        ],
        company: [
          { icon: "documents", label: "공유 문서", sub: "모두가 보는 파일" },
          { icon: "guidelines", label: "팀 지침", sub: "모두를 위한 규칙" },
        ],
      },
      flow: "프로젝트 안의 모든 채팅이 쓸 수 있어요",
      person: { school: "teacher", company: "employee" },
      chatsTitle: "채팅",
      chats: {
        school: [
          { label: "재활용 발표 자료", sub: "선생님과 이 과제 하나만 이야기해요", current: true },
          { label: "과학 퀴즈", sub: "다른 채팅" },
        ],
        company: [
          { label: "월간 보고서", sub: "직원과 이 업무 하나만 이야기해요", current: true },
          { label: "고객 이메일", sub: "다른 채팅" },
        ],
      },
      currentTag: "지금 이 채팅",
      note: "채팅은 각각 따로예요. 다른 채팅에서 한 말을 이 채팅이 모를 수 있어요.",
    },

    guide: {
      eyebrow: "무엇을 쓸까요?",
      title: "가장 간단한 방법을 고르세요.",
      useWhen: "이럴 때",
      likeLabel: "비유",
      options: [
        {
          name: "일반 채팅",
          icon: { school: "outside", company: "briefcase" },
          when: "필요한 내용을 바로 다 설명할 수 있는 한 번짜리 일",
          like: { school: "교실 밖에서 선생님 만나기", company: "한 번만 하는 업무" },
        },
        {
          name: "프로젝트",
          icon: { school: "classroom", company: "workspace" },
          when: "같은 자료와 안내를 계속 쓰는 이어지는 일",
          like: { school: "교실", company: "팀 업무 공간" },
        },
        {
          name: "커넥터",
          icon: "apps",
          when: "다른 앱이나 서비스가 필요한 일",
          like: { school: "선생님이 쓰는 앱", company: "직원이 쓰는 업무용 앱" },
        },
      ],
      together: "함께 쓸 수도 있어요. 프로젝트 안의 채팅에서도 ==커넥터를 쓸 수 있어요==.",
    },

    example: {
      eyebrow: "예시",
      title: "막연한 요청을 분명하게.",
      vagueLabel: "막연한 요청",
      copy: "프롬프트 복사",
      copied: "복사했어요",
      copiedNote: "프롬프트를 복사했어요. Claude에 붙여 넣어 직접 해 보세요.",
      copyFailed: "복사하지 못했어요. 글을 직접 선택해서 복사해 주세요.",
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
      ingredientWord: "부분",
      ingredientsTitle: "도움이 되는 다섯 가지",
      ingredients: [
        { name: "과제", detail: "슬라이드 5장짜리 발표 자료" },
        { name: "대상", detail: "10살 어린이" },
        { name: "자료", detail: "학교 안내서" },
        { name: "원하는 결과", detail: "쉬운 말과 교실 활동 하나" },
        { name: "예시", detail: "예시 슬라이드" },
      ],
      sampleMetaphor: {
        school: "선생님께 예시 과제를 보여 드리세요.",
        company: "직원에게 완성된 예시를 보여 주세요.",
      },
      sampleWhy: "예시를 보여 주면 AI가 짐작하지 않아도 돼요.",
      slideTag: "형식 예시 · 확인된 답이 아니에요",
      slideLabel: "형식을 보여 주는 예시 슬라이드: 짧은 제목 하나와 글머리 기호 세 개.",
      slideTitle: "재활용이란?",
      slideBullets: ["쓰던 물건이 새 물건으로 다시 태어나요", "종이, 캔, 플라스틱 병", "버리기 전에 분리해요"],
      slideCaption: "짧은 제목 1개 · 글머리 기호 최대 3개",
    },

    context: {
      eyebrow: "자료 고르기",
      title: "모든 자료가 아니라, 알맞은 자료를 가져오세요.",
      body: "==주제에 맞고 최신인 자료==를 고르세요. ==어떤 자료가 가장 중요한지== 말해 주세요. 오래되었거나 서로 다른 내용이 있으면 알려 주세요.",
      icon: { school: "bookshelf", company: "cabinet" },
      metaphor: {
        school: "관계없는 책이 가득한 교실은 과제를 더 분명하게 만들지 않아요.",
        company: "관계없는 문서가 가득한 서류함은 일을 더 분명하게 만들지 않아요.",
      },
      checks: ["주제에 맞는 자료", "최신 자료", "가장 중요한 자료 알려 주기", "오래되거나 다른 내용 알려 주기"],
    },

    takeaway: {
      eyebrow: "꼭 기억하세요",
      steps: ["분명한 과제", "도움이 되는 자료", "피드백", "확인"],
      body: "첫 요청이 완벽하지 않아도 괜찮아요. 목표부터 말하고, 자료와 예시를 더한 뒤, 함께 다듬어 가세요. AI도 틀릴 수 있으니 ==결과는 꼭 확인하세요==.",
      followLabel: "피드백 예시",
      follow: "“더 짧게 줄이고, 어려운 단어는 쉽게 풀어 줘.”",
      reviewLabel: "확인 예시",
      review: "이름, 날짜, 사실이 맞는지, 그리고 요청한 대로 만들었는지 확인하세요.",
    },

    tryIt: {
      eyebrow: "직접 해 보기",
      title: "이제 직접 해 보세요.",
      body: "Claude를 열고 예시를 붙여 넣어 결과를 확인해 보세요. 그다음 선생님께 하듯 ==피드백을 주세요==.",
      copyTitle: "예시 복사하기",
      copyText: "위 예시의 분명한 요청을 복사해요.",
      copyButton: "예시 프롬프트 복사",
      openTitle: "Claude 열기",
      openText: "새 탭에서 Claude를 열고 붙여 넣어요.",
      openButton: "Claude 열기",
      feedbackTitle: "피드백 주기",
      feedbackText: "결과를 읽고 바꿀 점을 말해 보세요.",
      feedbackExample: "“더 짧게 줄여 줘.”",
      note: "Claude에 로그인해야 해요. 무료 계정으로도 할 수 있어요.",
    },

    more: {
      summary: "더 알아보기",
      hint: "알아 두면 좋은 점과 출처",
      notesTitle: "알아 두면 좋은 점",
      notes: [
        "선생님과 직원은 비유일 뿐이에요. 새 채팅이 새로운 사람이 되거나, 혼자서 알아서 일하는 것은 아니에요.",
        "새 채팅이 항상 처음부터 시작하는 것은 아니에요. 앱과 설정에 따라 메모리가 일부 내용을 이어 줄 수 있어요. 그래도 중요한 내용은 다시 말해 주세요.",
        "프로젝트의 공유 자료와 지난 채팅 기록은 서로 달라요. 한 채팅이 다른 채팅의 내용을 다 안다고 생각하지 마세요.",
        "프로젝트는 자료를 쓸 수 있게 해 줄 뿐, 모든 파일을 꼭 본다는 뜻은 아니에요.",
        "폴더를 공유해도 그 안의 내용이 프로젝트로 복사되지는 않아요.",
        "커넥터는 앱이 지원하고 여러분이 허락한 일만 해요. 읽을 수 있다고 해서 만들거나 고칠 수 있는 것은 아니에요.",
        "자료가 있다고 해서 답이 항상 맞는 것은 아니에요.",
        "Claude와 ChatGPT는 기능, 요금제, 설정이 서로 달라요.",
      ],
      sourcesTitle: "출처",
      sourcesIntro: "2026년 10월에 확인한 공식 도움말이에요(영문). 기능은 바뀔 수 있으니 자세한 내용은 다시 확인하세요.",
      newTab: "(새 탭에서 열림)",
      sources: [
        { title: "Claude Help Center — What are projects?", url: "https://support.claude.com/en/articles/9517075-what-are-projects", why: "프로젝트에는 자체 채팅, 파일, 안내 사항이 있어요." },
        { title: "Claude Help Center — How can I create and manage projects?", url: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects", why: "프로젝트 파일과 안내 사항을 추가하는 방법." },
        { title: "Claude Help Center — RAG for projects", url: "https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects", why: "큰 프로젝트는 모든 자료를 한 번에 읽지 않고, 필요한 부분을 찾아 써요." },
        { title: "Claude Help Center — Chat search and memory", url: "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context", why: "메모리와 지난 채팅 검색은 요금제와 설정에 따라 달라요." },
        { title: "Claude Help Center — Use connectors", url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities", why: "커넥터 기능마다 읽기 전용, 쓰기 같은 권한이 따로 있어요." },
        { title: "Claude Help Center — Google Workspace connectors", url: "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors", why: "Google Drive 커넥터로 할 수 있는 일과, 먼저 허락을 묻는 경우." },
        { title: "OpenAI Help Center — Projects in ChatGPT", url: "https://help.openai.com/en/articles/10169521-projects-in-chatgpt", why: "ChatGPT에도 비슷한 개념이 있지만, 기능은 따로 있어요." },
      ],
    },
  },
};
