import React, { useState, useEffect } from 'react';
import { NEWS_ARTICLES } from '../data/mockData';
import { NewsArticle, NewsComment } from '../types';
import {
  Heart,
  Repeat2,
  MessageCircle,
  Bookmark,
  Share2,
  BadgeCheck,
  Send,
  Calendar,
  Languages,
  Check,
  Clock,
  Pin,
  ArrowRight,
  X,
  RefreshCw
} from 'lucide-react';

const STADIUM_BG = '/src/assets/images/stadium_arena_1790682419357.jpg';

// Real people profiles with high-quality profile photos
const COMMUNITY_PERSONAS = [
  {
    author: 'Daan van Dijk',
    handle: 'DaanVD_Pro',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    textNl: 'Wat een heerlijke wedstrijd! RaySist en Israël zijn dodelijk voorin, en Baloa_6 schiet ze er makkelijk in 🔥🦁',
    textEn: 'What an incredible match! RaySist and Israël are lethal up front, and Baloa_6 scores for fun 🔥🦁',
    verified: true,
    likes: 342,
  },
  {
    author: 'Lars van de Berg',
    handle: 'Lars_VDB',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    textNl: 'Die aanname op de borst en volley in de kruising bij minuut 28 is echt puur genieten. Honderd procent Goal van de Week! 🚀⚽',
    textEn: 'That chest control and top-corner volley at minute 28 was pure quality. Absolutely Goal of the Week material! 🚀⚽',
    verified: true,
    likes: 289,
  },
  {
    author: 'Milan de Jong',
    handle: 'MilanDJ_FC',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    textNl: 'De looplijnen bij de 2-2 waren echt uit het boekje. Snelle kaats via Israël en direct weggedraaid! 🎯',
    textEn: 'The movement for the 2-2 goal was textbook. Quick combination through Israël and clinical finish! 🎯',
    verified: false,
    likes: 195,
  },
  {
    author: 'Ruben Bakker',
    handle: 'RubenBakker99',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    textNl: 'Als supporter van het eerste uur: respect voor het vechten tot de laatste minuut. Volgende match pakken we de volle 3 punten 👊',
    textEn: 'Day one supporter here: massive respect for fighting until the final whistle. Next match the 3 points are ours 👊',
    verified: false,
    likes: 156,
  },
  {
    author: 'Sven Visser',
    handle: 'SvenVisserNL',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    textNl: '72% balbezit onder zware druk in Divisie 5 is gewoon heel netjes. Middenveld stond als een huis.',
    textEn: '72% pass accuracy under heavy pressure in Division 5 is impressive. Midfield held strong.',
    verified: true,
    likes: 210,
  },
  {
    author: 'Bram de Wit',
    handle: 'BramDW',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    textNl: 'Die tegenstanders hadden hun handen vol aan onze voorhoede. Israël en RaySist dicteren het tempo voorin! 🦁',
    textEn: 'The opponents had their hands full with our strikers. Israël and RaySist dictate the tempo up front! 🦁',
    verified: false,
    likes: 420,
  },
  {
    author: 'Emma Vos',
    handle: 'EmmaVos_FC',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    textNl: 'Zo tof om de club zo te zien groeien in Gen-5! De sfeer in Discord tijdens de wedstrijden is goud waard.',
    textEn: 'So great to see the club thriving in Gen-5! The Discord vibe during matches is unmatched.',
    verified: false,
    likes: 178,
  },
  {
    author: 'Sem Hendriks',
    handle: 'SemHendriks27',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    textNl: 'Heb net mijn try-out aanvraag ingestuurd voor centrale verdediger! Hopelijk snel een proefwedstrijd spelen 🛡️',
    textEn: 'Just submitted my CB try-out application! Hope to play a trial match soon 🛡️',
    verified: false,
    likes: 145,
  },
];

interface NewsSectionProps {
  articles?: NewsArticle[];
  onRefreshLive?: () => void;
  isRefreshing?: boolean;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  articles,
  onRefreshLive,
  isRefreshing = false
}) => {
  const allArticles = articles && articles.length > 0 ? articles : NEWS_ARTICLES;
  const [newsLang, setNewsLang] = useState<'nl' | 'en'>('nl');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticleModal, setActiveArticleModal] = useState<NewsArticle | null>(null);

  // Social interactions state: tracks likes, reposts, bookmarks
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({
    'news-promo': true,
    'news-fcziektewet': true,
  });
  const [repostedArticles, setRepostedArticles] = useState<Record<string, boolean>>({});
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Record<string, boolean>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({
    'news-promo': true,
  });

  // Comments state: initialized with realistic simulated comments arriving at different times of the day based on likes
  const [articleComments, setArticleComments] = useState<Record<string, NewsComment[]>>(() => {
    const saved = localStorage.getItem('predator_comments_store');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }

    const initial: Record<string, NewsComment[]> = {};

    allArticles.forEach((article) => {
      // Determine number of simulated comments based on post likes:
      // High likes (>15,000) get 4 comments spread throughout the day
      // Medium likes (5,000-15,000) get 2 to 3 comments
      // Lower likes get 1 to 2 comments
      const count = article.likes > 15000 ? 4 : article.likes > 7000 ? 3 : 2;

      // Realistic timestamps simulating random times throughout the day
      const timesNl = ['18m geleden', '45m geleden', '2u geleden', '5u geleden'];
      const timesEn = ['18m ago', '45m ago', '2h ago', '5h ago'];

      const commentsForArticle: NewsComment[] = [];
      const offset = (article.id.charCodeAt(article.id.length - 1) || 0) % COMMUNITY_PERSONAS.length;

      for (let i = 0; i < count; i++) {
        const persona = COMMUNITY_PERSONAS[(offset + i) % COMMUNITY_PERSONAS.length];
        commentsForArticle.push({
          id: `cmt-${article.id}-${i}-${persona.handle}`,
          author: persona.author,
          handle: persona.handle,
          avatar: persona.avatar,
          text: persona.textEn,
          textNl: persona.textNl,
          timestamp: newsLang === 'nl' ? timesNl[i] : timesEn[i],
          likes: persona.likes + (i * 15),
          verified: persona.verified,
        });
      }

      initial[article.id] = commentsForArticle;
    });

    return initial;
  });

  // Save comments to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('predator_comments_store', JSON.stringify(articleComments));
    } catch {
      // ignore
    }
  }, [articleComments]);

  // Simulate an occasional organic comment dropping in during the day (every 90s)
  useEffect(() => {
    const interval = setInterval(() => {
      const topArticle = NEWS_ARTICLES[0];
      if (!topArticle) return;

      const randomPersona = COMMUNITY_PERSONAS[Math.floor(Math.random() * COMMUNITY_PERSONAS.length)];
      const timesNl = ['Zojuist', '1m geleden', '3m geleden'];
      const timesEn = ['Just now', '1m ago', '3m ago'];

      const newIncomingComment: NewsComment = {
        id: `auto-cmt-${Date.now()}`,
        author: randomPersona.author,
        handle: randomPersona.handle,
        avatar: randomPersona.avatar,
        text: randomPersona.textEn,
        textNl: randomPersona.textNl,
        timestamp: newsLang === 'nl' ? timesNl[0] : timesEn[0],
        likes: Math.floor(Math.random() * 40) + 10,
        verified: randomPersona.verified,
      };

      setArticleComments((prev) => {
        const current = prev[topArticle.id] || [];
        // Avoid duplicate handles at the very top
        if (current[0]?.handle === randomPersona.handle) return prev;
        return {
          ...prev,
          [topArticle.id]: [newIncomingComment, ...current.slice(0, 8)],
        };
      });
    }, 90000);

    return () => clearInterval(interval);
  }, [newsLang]);

  // User input comment per article
  const [replyInput, setReplyInput] = useState<Record<string, string>>({});
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleLike = (id: string) => {
    setLikedArticles((prev) => {
      const isCurrentlyLiked = !!prev[id];
      const next = !isCurrentlyLiked;
      if (next) {
        showToast(newsLang === 'nl' ? '❤️ Je vindt dit bericht leuk!' : '❤️ Liked post!');
      }
      return { ...prev, [id]: next };
    });
  };

  const handleToggleRepost = (id: string) => {
    setRepostedArticles((prev) => {
      const isCurrently = !!prev[id];
      const next = !isCurrently;
      if (next) {
        showToast(newsLang === 'nl' ? '🔁 Gedeeld op je profiel!' : '🔁 Reposted to your feed!');
      }
      return { ...prev, [id]: next };
    });
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedArticles((prev) => {
      const isCurrently = !!prev[id];
      const next = !isCurrently;
      if (next) {
        showToast(newsLang === 'nl' ? '🔖 Opgeslagen in je bladwijzers!' : '🔖 Saved to your bookmarks!');
      }
      return { ...prev, [id]: next };
    });
  };

  const handleShareTweet = (article: NewsArticle) => {
    const textToCopy = `${article.title} - Predator United FC 27 Pro Clubs https://predatorunited.club/`;
    navigator.clipboard.writeText(textToCopy);
    showToast(newsLang === 'nl' ? '📋 Link gekopieerd naar klembord!' : '📋 Link copied to clipboard!');
  };

  const handleToggleComments = (id: string) => {
    setExpandedComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleCommentLike = (commentId: string) => {
    setLikedComments((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  // Add user comment and realistic follower response
  const handlePostReply = (articleId: string) => {
    const text = (replyInput[articleId] || '').trim();
    if (!text) return;

    const userComment: NewsComment = {
      id: `user-reply-${Date.now()}`,
      author: newsLang === 'nl' ? 'Jij (Supporter)' : 'You (Supporter)',
      handle: 'PredatorSupporter',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      text: text,
      textNl: text,
      timestamp: newsLang === 'nl' ? 'Zojuist' : 'Just now',
      likes: 1,
      verified: false,
    };

    setArticleComments((prev) => ({
      ...prev,
      [articleId]: [userComment, ...(prev[articleId] || [])],
    }));

    setReplyInput((prev) => ({ ...prev, [articleId]: '' }));
    showToast(newsLang === 'nl' ? '💬 Reactie geplaatst!' : '💬 Comment posted!');

    // Simulate an organic community reply after 1.4 seconds
    setTimeout(() => {
      const isNl = newsLang === 'nl';
      const responsesNl = [
        `@PredatorSupporter Helemaal mee eens! De aanvalskracht en teamspirit zijn ongekend. Divisie 4 ligt voor het grijpen! 🦁`,
        `@PredatorSupporter Goed gezegd! Aanvalskoppel n. Israël en T. RaySist gaat komende speelavond weer vlammen. ⚽`,
        `@PredatorSupporter 100%! Vaste speelavonden op dinsdag en donderdag zijn altijd strijden tot de laatste minuut.`,
      ];
      const responsesEn = [
        `@PredatorSupporter Totally agree! The attacking power and team spirit in this squad are immense. Division 4 is within reach! 🦁`,
        `@PredatorSupporter Well said! n. Israël and T. RaySist are going to cause havoc again next session. ⚽`,
        `@PredatorSupporter 100%! Tuesday and Thursday sessions are always high intensity till the final whistle.`,
      ];

      const pool = isNl ? responsesNl : responsesEn;
      const pickedText = pool[Math.floor(Math.random() * pool.length)];

      const peerPersona = COMMUNITY_PERSONAS[Math.floor(Math.random() * COMMUNITY_PERSONAS.length)];

      const peerReply: NewsComment = {
        id: `peer-reply-${Date.now()}`,
        author: peerPersona.author,
        handle: peerPersona.handle,
        avatar: peerPersona.avatar,
        text: pickedText,
        textNl: pickedText,
        timestamp: isNl ? 'Zojuist' : 'Just now',
        likes: 14,
        verified: peerPersona.verified,
      };

      setArticleComments((prev) => ({
        ...prev,
        [articleId]: [peerReply, ...(prev[articleId] || [])],
      }));
    }, 1400);
  };

  const categories = newsLang === 'nl'
    ? [
        { id: 'All', label: 'Alles' },
        { id: 'Match Report', label: 'Wedstrijdverslagen' },
        { id: 'Tactics', label: 'Tactiek' },
        { id: 'Squad', label: 'Selectie & Try-outs' },
      ]
    : [
        { id: 'All', label: 'All Posts' },
        { id: 'Match Report', label: 'Match Reports' },
        { id: 'Tactics', label: 'Tactics' },
        { id: 'Squad', label: 'Squad & Try-outs' },
      ];

  const filteredArticles = selectedCategory === 'All'
    ? allArticles
    : allArticles.filter((a) => {
        if (selectedCategory === 'Match Report') return a.category === 'Match Report' || a.category === 'Wedstrijdverslag';
        if (selectedCategory === 'Tactics') return a.category === 'Tactics' || a.category === 'Tactiek';
        if (selectedCategory === 'Squad') return a.category === 'Squad' || a.category === 'Selectie' || a.category === 'Club News' || a.category === 'Clubnieuws';
        return a.category === selectedCategory;
      });

  return (
    <section id="nieuws" className="py-8 md:py-12 bg-slate-100/70 border-b border-slate-200 min-h-[calc(100vh-4rem)]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Twitter / X Style Club Feed Banner */}
        <div className="mb-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Top Banner Image */}
          <div className="h-32 sm:h-44 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 relative">
            <img
              src={STADIUM_BG}
              alt="Predator United Stadium"
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/40 text-blue-200 text-[11px] font-bold tracking-wide">
                EA FC 27 PRO CLUBS · COMMON-GEN5
              </span>
            </div>
          </div>

          {/* Profile Bar with Avatar & Language Selector */}
          <div className="px-5 sm:px-8 pb-5 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-4">
              {/* Avatar: Official EASFC Shield */}
              <div className="flex items-end gap-3.5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-blue-900 p-2 border-4 border-white shadow-xl relative group overflow-hidden flex items-center justify-center text-white font-black text-3xl tracking-wider select-none">
                  PU
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-slate-950 shadow-sm" title="Verified EA FC 27 Club">
                    <BadgeCheck className="w-3.5 h-3.5 fill-amber-400 text-slate-950" />
                  </div>
                </div>

                <div className="pt-2 sm:pt-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                      Predator United FC
                    </h2>
                    <span className="inline-flex items-center text-blue-600" title="Verified Club">
                      <BadgeCheck className="w-5 h-5 fill-blue-600 text-white" />
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 font-mono">
                      Club #181654
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 font-semibold">
                    @PredatorUnited
                  </div>
                </div>
              </div>

              {/* Language Switch Option (NL / EN) */}
              <div className="flex flex-col sm:items-end gap-1.5 pt-2 sm:pt-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-blue-600" />
                  <span>{newsLang === 'nl' ? 'Taal Nieuwsfeed' : 'Feed Language'}</span>
                </span>

                <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-300 shadow-xs">
                  <button
                    onClick={() => {
                      setNewsLang('nl');
                      showToast('🇳🇱 Nieuwsfeed in het Nederlands ingesteld!');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      newsLang === 'nl'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <span>🇳🇱 Nederlands</span>
                    {newsLang === 'nl' && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>

                  <button
                    onClick={() => {
                      setNewsLang('en');
                      showToast('🇬🇧 Newsfeed switched to English!');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      newsLang === 'en'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <span>🇬🇧 English</span>
                    {newsLang === 'en' && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Club Twitter Bio */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium max-w-3xl">
              {newsLang === 'nl'
                ? 'Officiële clubfeed van Predator United in EA Sports FC 27 Pro Clubs (Divisie 5). Live wedstrijdverslagen, doelpuntclips, tactische analyses & supporters reacties. ⚽ #PRED'
                : 'Official club feed for Predator United in EA Sports FC 27 Pro Clubs (Division 5). Match reports, goal highlights, tactical breakdowns & supporter reactions. ⚽ #PRED'}
            </p>

            {/* Follower & Community Stats */}
            <div className="flex flex-wrap items-center gap-5 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div>
                <span className="font-black text-slate-950 text-sm">28.4K</span>{' '}
                <span className="text-slate-500">{newsLang === 'nl' ? 'Volgers' : 'Followers'}</span>
              </div>
              <div>
                <span className="font-black text-slate-950 text-sm">14</span>{' '}
                <span className="text-slate-500">{newsLang === 'nl' ? 'Volgend' : 'Following'}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{newsLang === 'nl' ? 'Lid sinds sept 2026' : 'Joined Sept 2026'}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 font-bold text-[11px] ml-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{newsLang === 'nl' ? 'Live EA FC 27 Sync Actief' : 'Live EA FC 27 Sync Active'}</span>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="border-t border-slate-200 bg-slate-50/80 px-4 flex items-center gap-1 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {cat.label}
              </button>
            ))}

            {onRefreshLive && (
              <button
                onClick={onRefreshLive}
                disabled={isRefreshing}
                className="ml-auto my-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                title="Herlaad live wedstrijden & artikelen van EA FC 27"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Laden...' : newsLang === 'nl' ? 'Ververs Nieuws' : 'Refresh News'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-5">
          {filteredArticles.map((article) => {
            const isLiked = !!likedArticles[article.id];
            const isReposted = !!repostedArticles[article.id];
            const isBookmarked = !!bookmarkedArticles[article.id];
            const areCommentsOpen = !!expandedComments[article.id];
            const currentComments = articleComments[article.id] || [];

            // Massive likes count on major news posts!
            const displayedLikes = article.likes + (isLiked ? 1 : 0);
            const displayedReposts = article.reposts + (isReposted ? 1 : 0);
            const displayedBookmarks = article.bookmarks + (isBookmarked ? 1 : 0);

            // Text localization based on selected language
            const postTitle = (newsLang === 'nl' && article.titleNl) ? article.titleNl : article.title;
            const postSubtitle = (newsLang === 'nl' && article.subtitleNl) ? article.subtitleNl : article.subtitle;
            const postSummary = (newsLang === 'nl' && article.summaryNl) ? article.summaryNl : article.summary;
            const postCategory = (newsLang === 'nl' && article.categoryNl) ? article.categoryNl : article.category;
            const postReadTime = (newsLang === 'nl' && article.readTimeNl) ? article.readTimeNl : article.readTime;

            return (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-all shadow-xs hover:shadow-md overflow-hidden"
              >
                {/* Pinned tweet badge if featured */}
                {article.featured && (
                  <div className="px-5 pt-3 pb-1 text-slate-500 text-xs font-bold flex items-center gap-1.5 border-b border-slate-50 bg-slate-50/50">
                    <Pin className="w-3.5 h-3.5 text-blue-600 fill-blue-600 rotate-45" />
                    <span>{newsLang === 'nl' ? 'Vastgezet Clubbericht' : 'Pinned Post'}</span>
                    <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
                      {newsLang === 'nl' ? 'Veel Bekeken · Top Engagement' : 'Top Engagement'}
                    </span>
                  </div>
                )}

                <div className="p-5 sm:p-6">
                  {/* Header: Avatar, Name, Handle, Timestamp */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-900 text-white font-bold text-xs flex items-center justify-center border border-slate-200 shadow-xs shrink-0 select-none">
                        PU
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-black text-slate-950 text-sm hover:underline cursor-pointer">
                            Predator United FC
                          </span>
                          <BadgeCheck className="w-4 h-4 fill-blue-600 text-white shrink-0" />
                          <span className="text-slate-500 text-xs font-mono font-medium">
                            @PredatorUnited
                          </span>
                          <span className="text-slate-300 text-xs">·</span>
                          <span className="text-slate-500 text-xs font-medium">
                            {article.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="px-2 py-0.2 rounded font-bold uppercase text-[9px] bg-blue-50 text-blue-700 border border-blue-200">
                            {postCategory}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {postReadTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Translate Button for this Post */}
                    <button
                      onClick={() => {
                        const target = newsLang === 'nl' ? 'en' : 'nl';
                        setNewsLang(target);
                        showToast(target === 'nl' ? '🇳🇱 Vertaald naar Nederlands' : '🇬🇧 Translated to English');
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                      title={newsLang === 'nl' ? 'Vertaal naar Engels' : 'Translate to Dutch'}
                    >
                      <Languages className="w-3 h-3" />
                      <span className="hidden sm:inline">{newsLang === 'nl' ? 'Translate' : 'Vertalen'}</span>
                      <span className="sm:hidden">{newsLang === 'nl' ? 'EN' : 'NL'}</span>
                    </button>
                  </div>

                  {/* Main Post Body */}
                  <div className="space-y-2.5 pl-0 sm:pl-14">
                    <h3
                      onClick={() => setActiveArticleModal(article)}
                      className="text-lg sm:text-xl font-black text-slate-950 leading-snug tracking-tight hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {postTitle}
                    </h3>

                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {postSubtitle}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {postSummary}
                    </p>

                    {/* Embedded Match Card */}
                    {article.matchScore && (
                      <div className="my-3 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-800/60 p-4 sm:p-5 text-white shadow-md relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none">
                          <img
                            src={STADIUM_BG}
                            alt="Stadium"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-center justify-between gap-2 text-xs text-blue-300 font-mono uppercase font-bold mb-3 border-b border-blue-800/50 pb-2">
                            <span>EA FC 27 Pro Clubs · Matchday #1</span>
                            <span className="text-amber-400">Division 5</span>
                          </div>

                          <div className="flex items-center justify-between gap-4 py-2">
                            <div className="flex-1 text-center sm:text-left">
                              <div className="text-sm sm:text-base font-black uppercase tracking-tight text-white flex items-center gap-1.5 justify-center sm:justify-start">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                <span>{article.matchScore.homeTeam}</span>
                              </div>
                              <div className="text-[11px] text-blue-200 mt-1 font-mono">
                                n. Israël (28') ⚽ · T. RaySist (67') ⚽
                              </div>
                            </div>

                            <div className="px-4 py-1.5 rounded-xl bg-black/50 border border-blue-500/40 text-xl sm:text-3xl font-black font-mono text-white tracking-widest shadow-inner">
                              {article.matchScore.homeScore} - {article.matchScore.awayScore}
                            </div>

                            <div className="flex-1 text-center sm:text-right">
                              <div className="text-sm sm:text-base font-black uppercase tracking-tight text-slate-300">
                                {article.matchScore.awayTeam}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                                34', 58', 86' ⚽
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-blue-800/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="text-emerald-400 font-semibold text-[11px]">
                              ⭐ Striker Duo Match Rating: 7.9 / 10
                            </span>
                            <button
                              onClick={() => setActiveArticleModal(article)}
                              className="text-xs font-bold text-blue-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span>{newsLang === 'nl' ? 'Volledig verslag lezen' : 'Read full match report'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-blue-600 hover:underline cursor-pointer font-semibold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* High Engagement Metric Bar */}
                    <div className="py-2 border-y border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                      <div>
                        <span className="font-black text-slate-900">{displayedLikes.toLocaleString()}</span>{' '}
                        <span>{newsLang === 'nl' ? 'Vind-ik-leuks' : 'Likes'}</span>
                      </div>
                      <div>
                        <span className="font-black text-slate-900">{displayedReposts.toLocaleString()}</span>{' '}
                        <span>{newsLang === 'nl' ? 'Reposts' : 'Reposts'}</span>
                      </div>
                      <div>
                        <span className="font-black text-slate-900">{article.views}</span>{' '}
                        <span>{newsLang === 'nl' ? 'Weergaven' : 'Views'}</span>
                      </div>
                      <div>
                        <span className="font-black text-slate-900">{displayedBookmarks.toLocaleString()}</span>{' '}
                        <span>{newsLang === 'nl' ? 'Bladwijzers' : 'Bookmarks'}</span>
                      </div>
                    </div>

                    {/* Action Bar: Reply, Repost, Like, Bookmark, Share */}
                    <div className="flex items-center justify-between pt-1 text-slate-500 text-xs">
                      {/* Reply / Comment Button */}
                      <button
                        onClick={() => handleToggleComments(article.id)}
                        className={`flex items-center gap-1.5 p-2 rounded-xl transition-all cursor-pointer ${
                          areCommentsOpen
                            ? 'text-blue-600 bg-blue-50 font-bold'
                            : 'hover:text-blue-600 hover:bg-blue-50'
                        }`}
                        title="View comments"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{currentComments.length}</span>
                        <span className="hidden sm:inline">
                          {newsLang === 'nl' ? 'Reacties' : 'Comments'}
                        </span>
                      </button>

                      {/* Repost Button */}
                      <button
                        onClick={() => handleToggleRepost(article.id)}
                        className={`flex items-center gap-1.5 p-2 rounded-xl transition-all cursor-pointer ${
                          isReposted
                            ? 'text-emerald-600 bg-emerald-50 font-bold'
                            : 'hover:text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title="Repost"
                      >
                        <Repeat2 className="w-4 h-4" />
                        <span>{displayedReposts.toLocaleString()}</span>
                      </button>

                      {/* Huge Like Button */}
                      <button
                        onClick={() => handleToggleLike(article.id)}
                        className={`flex items-center gap-1.5 p-2 rounded-xl transition-all cursor-pointer group/like ${
                          isLiked
                            ? 'text-rose-600 bg-rose-50 font-black'
                            : 'hover:text-rose-600 hover:bg-rose-50'
                        }`}
                        title="Like"
                      >
                        <Heart
                          className={`w-4 h-4 transition-transform group-hover/like:scale-125 ${
                            isLiked ? 'fill-rose-600 text-rose-600 scale-110' : ''
                          }`}
                        />
                        <span className="font-bold">{displayedLikes.toLocaleString()}</span>
                      </button>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => handleToggleBookmark(article.id)}
                        className={`flex items-center gap-1.5 p-2 rounded-xl transition-all cursor-pointer ${
                          isBookmarked
                            ? 'text-blue-600 bg-blue-50 font-bold'
                            : 'hover:text-blue-600 hover:bg-blue-50'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`}
                        />
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={() => handleShareTweet(article)}
                        className="flex items-center gap-1.5 p-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
                        title="Copy link"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Community Comments Thread */}
                    {areCommentsOpen && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
                        {/* Header: Clean Comments Count */}
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">
                            {newsLang === 'nl'
                              ? `Reacties (${currentComments.length})`
                              : `Comments (${currentComments.length})`}
                          </h4>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {newsLang === 'nl' ? 'Gesimuleerde community activiteit' : 'Community reactions'}
                          </span>
                        </div>

                        {/* User Reply Input */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            value={replyInput[article.id] || ''}
                            onChange={(e) =>
                              setReplyInput((prev) => ({ ...prev, [article.id]: e.target.value }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handlePostReply(article.id);
                            }}
                            placeholder={
                              newsLang === 'nl'
                                ? 'Plaats een reactie als supporter...'
                                : 'Post a comment as a supporter...'
                            }
                            className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-blue-500 font-medium placeholder-slate-400"
                          />
                          <button
                            onClick={() => handlePostReply(article.id)}
                            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer shadow-xs shrink-0"
                            title="Post reply"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* List of Real People Comments with Profile Photos */}
                        <div className="space-y-2.5 pt-2">
                          {currentComments.map((comment) => {
                            const isCommentLiked = !!likedComments[comment.id];
                            const commentLikes = comment.likes + (isCommentLiked ? 1 : 0);
                            const commentText = (newsLang === 'nl' && comment.textNl) ? comment.textNl : comment.text;

                            return (
                              <div
                                key={comment.id}
                                className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-2.5 text-xs text-slate-800 group"
                              >
                                {/* Profile Photo Portrait */}
                                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-slate-300 shadow-xs bg-slate-200">
                                  {comment.avatar ? (
                                    <img
                                      src={comment.avatar}
                                      alt={comment.author}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                                      {comment.author.substring(0, 2).toUpperCase()}
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-bold text-slate-900">
                                      {comment.author}
                                    </span>
                                    {comment.verified && (
                                      <BadgeCheck className="w-3.5 h-3.5 fill-blue-600 text-white shrink-0" />
                                    )}
                                    <span className="text-slate-400 font-mono text-[11px]">
                                      @{comment.handle}
                                    </span>
                                    <span className="text-slate-300">·</span>
                                    <span className="text-slate-400 text-[11px]">
                                      {comment.timestamp}
                                    </span>
                                  </div>

                                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                                    {commentText}
                                  </p>

                                  <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">
                                    <button
                                      onClick={() => handleToggleCommentLike(comment.id)}
                                      className={`flex items-center gap-1 cursor-pointer transition-colors ${
                                        isCommentLiked ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
                                      }`}
                                    >
                                      <Heart className={`w-3 h-3 ${isCommentLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                                      <span>{commentLikes}</span>
                                    </button>

                                    <button
                                      onClick={() => {
                                        setReplyInput((prev) => ({
                                          ...prev,
                                          [article.id]: `@${comment.handle} `,
                                        }));
                                      }}
                                      className="hover:text-blue-600 cursor-pointer font-medium"
                                    >
                                      {newsLang === 'nl' ? 'Beantwoorden' : 'Reply'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Expanded Full Article Reader Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-blue-100 text-blue-800 border border-blue-200">
                  {newsLang === 'nl' ? activeArticleModal.categoryNl || activeArticleModal.category : activeArticleModal.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">· {activeArticleModal.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setNewsLang((prev) => (prev === 'nl' ? 'en' : 'nl'))}
                  className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{newsLang === 'nl' ? 'In English' : 'In het Nederlands'}</span>
                </button>
                <button
                  onClick={() => setActiveArticleModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {newsLang === 'nl' && activeArticleModal.titleNl ? activeArticleModal.titleNl : activeArticleModal.title}
              </h3>

              <div className="text-sm font-semibold text-blue-700 bg-blue-50/70 p-3 rounded-xl border border-blue-200/80 leading-relaxed">
                {newsLang === 'nl' && activeArticleModal.subtitleNl ? activeArticleModal.subtitleNl : activeArticleModal.subtitle}
              </div>

              {activeArticleModal.matchScore && (
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-center my-3">
                  <div className="text-xs uppercase font-bold text-slate-500 mb-1">
                    {newsLang === 'nl' ? 'Officiële Einduitslag' : 'Official Final Score'}
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                    {activeArticleModal.matchScore.homeTeam}{' '}
                    <span className="text-rose-600 font-mono">
                      {activeArticleModal.matchScore.homeScore} - {activeArticleModal.matchScore.awayScore}
                    </span>{' '}
                    {activeArticleModal.matchScore.awayTeam}
                  </div>
                  {activeArticleModal.matchScore.scorers && (
                    <div className="text-xs text-slate-600 mt-1 font-medium">
                      {newsLang === 'nl' ? 'Doelpuntenmakers' : 'Scorers'}: {activeArticleModal.matchScore.scorers.join(', ')}
                    </div>
                  )}
                </div>
              )}

              {/* Body Content in chosen language */}
              <div className="space-y-3 pt-2 text-slate-700 text-sm leading-relaxed font-normal">
                {(newsLang === 'nl' && activeArticleModal.contentNl ? activeArticleModal.contentNl : activeArticleModal.content).map(
                  (paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  )
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {newsLang === 'nl' ? 'Auteur:' : 'Written by'} {activeArticleModal.author}
              </span>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
              >
                {newsLang === 'nl' ? 'Sluiten' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
