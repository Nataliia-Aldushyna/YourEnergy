export function getLimitCategoryByPage() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 768) {
    return 12;
  }

  return 9;
}

export function getLimitExerciseByPage() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 768) {
    return 10;
  }

  return 8;
}