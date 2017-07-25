/* eslint-disable camelcase */
import { SRS_RANKS } from 'shared/constants';
import isString from 'lodash/isString';
import castArray from 'lodash/castArray';
import uniq from 'lodash/uniq';
import condenseReadings from 'utils/condenseReadings';

export const serializeUserResponse = serializeUser;
export const serializeLevelsResponse = serializeLevels;
export const serializeReviewResponse = serializeReviewEntry;
export const serializeAddSynonymResponse = serializeSynonym;
export const serializeQueueResponse = ({ results }) => {
  const reviews = serializeStubbedReviewEntries(results);
  return {
    reviews,
    reviewIds: Object.keys(reviews).map(Number),
  };
};

export const serializeLevelResponse = ({ id, results }) => {
  const reviews = serializeReviewEntries(results);
  return {
    id,
    reviews,
    reviewIds: Object.keys(reviews).map(Number),
  };
};


// TODO: extract utils to nested ./file with tests

// Add 'Common'|'Uncommon' and JLPT rank to tags list
const combineTags = ({ tags, jlpt, common }) => {
  const newTags = [common ? 'Common' : 'Uncommon', ...tags];
  return jlpt != null ? [jlpt, ...newTags] : newTags;
};

const dateOrNull = (date) => date == null ? null : new Date(date);

const toUniqueStringsArray = (data) => {
  let asArray = data;
  if (isString(data) && data.includes(', ')) {
    asArray = data.split(', ');
  } else {
    asArray = castArray(data);
  }
  return uniq(asArray);
};

/* eslint-disable no-return-assign, no-sequences, no-param-reassign */
const createHashMap = (data) => data.reduce((hash, item) => (hash[item.id] = item, hash), {});
/* eslint-enable */

function serializeLevels(levels = []) {
  return createHashMap(levels.map(serializeLevel));
}

function serializeMeaning(data) {
  return toUniqueStringsArray(data);
}

function serializeReadings(data = []) {
  return condenseReadings(data).map(serializeReading);
}

function serializeReviewEntries(data = []) {
  return createHashMap(data.map(serializeReviewEntry));
}

function serializeStubbedReviewEntries(data = []) {
  return createHashMap(data.map(serializeStubbedReviewEntry));
}

function serializeUser({
  email,
  profile,
}) {
  return {
    profile: serializeProfile({ email, ...profile }),
    dashboard: serializeDashboard(profile),
    settings: serializeSettings(profile),
  };
}

function serializeProfile({
  id,
  name,
  email,
  api_key: apiKey,
  api_valid,
  join_date: joinDate,
  level,
  unlocked_levels: unlockedLevels,
} = {}) {
  return {
    id,
    name,
    email,
    apiKey,
    isApiValid: !!api_valid,
    joinDate: dateOrNull(joinDate),
    currentLevel: +level,
    unlockedLevels: unlockedLevels.map(Number),
  };
}

/* eslint-disable no-param-reassign, no-return-assign, no-sequences */
const ranksWithZeroCount = Object.values(SRS_RANKS).reduce((hash, key) => (hash[key] = 0, hash), {});
const upcaseKeys = (obj) =>
  Object.entries(obj).reduce((hash, [key, val]) => (hash[key.toUpperCase()] = +val, hash), {});
const coerceValsToNumber = (obj) =>
  Object.entries(obj).reduce((hash, [key, val]) => (hash[key] = parseInt(val, 10), hash), {});
/* eslint-enable */

function serializeDashboard({
  reviews_count: reviewsCount = 0,
  lessons_count: lessonsCount = 0,
  reviews_within_hour_count: nextHourReviews = 0,
  reviews_within_day_count: nextDayReviews = 0,
  next_review_date: nextReviewDate,
  last_wanikani_sync_date: lastWkSyncDate,
  srs_counts: srsCounts = ranksWithZeroCount,
  vacation_date: vacationDate,
} = {}) {
  return {
    reviewsCount: +reviewsCount,
    lessonsCount: +lessonsCount,
    nextHourReviews: +nextHourReviews,
    nextDayReviews: +nextDayReviews,
    nextReviewDate: dateOrNull(nextReviewDate),
    vacationDate: dateOrNull(vacationDate),
    lastWkSyncDate: dateOrNull(lastWkSyncDate),
    srsCounts: coerceValsToNumber(upcaseKeys(srsCounts)),
  };
}

function serializeSettings({
  on_vacation: onVacation = false,
  follow_me: followMe = true,
  auto_advance_on_success: autoAdvanceCorrect = false,
  auto_advance_speed: autoAdvanceSpeed = 2000,
  auto_expand_answer_on_success: autoExpandCorrect = true,
  auto_expand_answer_on_failure: autoExpandIncorrect = true,
  minimum_wk_srs_level_to_review: minimumSrsToReview = SRS_RANKS.ONE,
  use_alc_pro_link: useAlcPro = false,
  kanji_svg_autoplay = true,
  kanji_svg_step_speed = 0.03,
  kanji_svg_show_strokes = false,
  kanji_svg_show_grid = false,
} = {}) {
  return {
    quiz: {
      onVacation,
      minimumSrsToReview,
      autoExpandCorrect,
      autoExpandIncorrect,
      autoAdvance: {
        active: autoAdvanceCorrect,
        speed: autoAdvanceSpeed,
      },
    },
    vocabulary: {
      followMe,
      useAlcPro,
      kanjiStroke: {
        autoplay: kanji_svg_autoplay,
        step: kanji_svg_step_speed,
        stroke: { order: { visible: kanji_svg_show_strokes } },
        grid: { show: kanji_svg_show_grid },
      },
    },
  };
}

export function deserializeSettings({
  quiz: {
    onVacation: on_vacation,
    minimumSrsToReview: minimum_wk_srs_level_to_review,
    autoExpandCorrect: auto_expand_answer_on_success,
    autoExpandIncorrect: auto_expand_answer_on_failure,
    autoAdvance: {
      active: auto_advance_on_success,
      speed: auto_advance_speed,
    },
  },
  vocabulary: {
    followMe: follow_me,
    useAlcPro: use_alc_pro_link,
    kanjiStroke: {
      autoplay: kanji_svg_autoplay,
      step: kanji_svg_step_speed,
      stroke: { order: { visible: kanji_svg_show_strokes } },
      grid: { show: kanji_svg_show_grid },
    },
  },
} = {}) {
  return {
    follow_me,
    on_vacation,
    minimum_wk_srs_level_to_review,
    auto_expand_answer_on_success,
    auto_expand_answer_on_failure,
    auto_advance_on_success,
    auto_advance_speed,
    use_alc_pro_link,
    kanji_svg_autoplay,
    kanji_svg_step_speed,
    kanji_svg_show_strokes,
    kanji_svg_show_grid,
  };
}

function serializeReading(reading) {
  return {
    id: +reading.id,
    level: reading.level,
    isCommon: !!reading.common,
    character: reading.character,
    kana: toUniqueStringsArray(reading.kana),
    tags: combineTags(reading),
    sentenceEn: reading.sentence_en || '',
    sentenceJa: reading.sentence_ja || '',
  };
}

function serializeVocabularyEntry({
  id,
  meaning,
  readings,
} = {}) {
  return {
    id: +id,
    meanings: serializeMeaning(meaning),
    readings: serializeReadings(readings),
  };
}

function serializeSynonym({ id, review, character, kana }) {
  return {
    id,
    reviewId: review,
    character,
    kana: [kana],
  };
}

function serializeSynonyms(synonyms = []) {
  return synonyms.map(serializeSynonym);
}

function serializeStubbedReviewEntry({
  id,
  correct,
  incorrect,
  streak,
  notes,
  vocabulary,
  answer_synonyms,
} = {}) {
  return {
    id: +id,
    correct: +correct,
    incorrect: +incorrect,
    streak: +streak,
    notes: notes == null ? '' : notes,
    synonyms: serializeSynonyms(answer_synonyms),
    vocabulary: serializeVocabularyEntry(vocabulary),
  };
}

function serializeReviewEntry({
  unlock_date: unlockDate,
  last_studied: lastReviewDate,
  next_review_date: nextReviewDate,
  needs_review: isReviewReady,
  hidden: isHidden,
  critical: isCritical,
  burned: isBurned,
  wanikani_burned,
  wanikani_srs_numeric,
  wanikani_srs,
  ...rest
} = {}) {
  return {
    isReviewReady,
    lastReviewDate: dateOrNull(lastReviewDate),
    unlockDate: dateOrNull(unlockDate),
    nextReviewDate: dateOrNull(nextReviewDate),
    isHidden,
    isCritical,
    isBurned,
    wk: {
      isBurned: !!wanikani_burned,
      streakName: wanikani_srs.toUpperCase(),
    },
    ...serializeStubbedReviewEntry(rest),
  };
}

function serializeLevel({
  level,
  vocabulary_count: count,
  unlocked,
}) {
  return {
    id: +level,
    count: +count,
    isLocked: !unlocked,
    reviews: [],
  };
}
