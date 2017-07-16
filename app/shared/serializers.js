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
  email,
  name,
  api_key: apiKey,
  api_valid,
  level,
  join_date: joinDate,
  unlocked_levels: unlockedLevels,
} = {}) {
  return {
    name,
    email,
    apiKey,
    isApiValid: !!api_valid,
    currentLevel: +level,
    joinDate: dateOrNull(joinDate),
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
  last_wanikani_sync_date: lastWkSyncDate = null,
  srs_counts: srsCounts = ranksWithZeroCount,
} = {}) {
  return {
    reviewsCount: +reviewsCount,
    lessonsCount: +lessonsCount,
    nextHourReviews: +nextHourReviews,
    nextDayReviews: +nextDayReviews,
    lastWkSyncDate: dateOrNull(lastWkSyncDate),
    srsCounts: coerceValsToNumber(upcaseKeys(srsCounts)),
  };
}

function serializeSettings({
  follow_me: followMe,
  auto_advance_on_success: autoAdvanceCorrect,
  auto_advance_speed: autoAdvanceSpeed,
  auto_expand_answer_on_success: autoExpandCorrect,
  auto_expand_answer_on_failure: autoExpandIncorrect,
  minimum_wk_srs_level_to_review: minimumSrsToReview,
  on_vacation: onVacation,
  vacation_date: vacationDate,
} = {}) {
  return {
    followMe,
    minimumSrsToReview,
    onVacation,
    vacationDate: dateOrNull(vacationDate),
    quiz: {
      autoAdvance: {
        active: /* autoAdvanceCorrect*/ true, // FIXME: uncomment after dev
        speed: autoAdvanceSpeed,
      },
      autoExpandCorrect,
      autoExpandIncorrect,
    },
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

function serializeSynonym({ review: reviewId, ...rest }) {
  return {
    reviewId,
    ...rest,
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
