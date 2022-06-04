export const reviewCountToInfo = (positiveCount, totalCount) => {
  if (totalCount < 10) {
    return { text: '없거나 적음', status: 'no_reviews' }
  }

  const rate = (positiveCount / totalCount) * 100

  if (totalCount >= 500) {
    if (rate >= 95) {
      return { text: '압도적으로 긍정적', status: 'positive' }
    } else if (rate < 20) {
      return { text: '압도적으로 부정적', status: 'negative' }
    }
  }

  if (totalCount < 50) {
    if (rate >= 80) {
      return { text: '긍정적', status: 'positive' }
    } else if (rate < 20) {
      return { text: '부정적', status: 'negative' }
    }
  }

  if (rate >= 80) {
    return { text: '매우 긍정적', status: 'positive' }
  } else if (rate >= 70) {
    return { text: '대체로 긍정적', status: 'positive' }
  } else if (rate >= 40) {
    return { text: '복합적', status: 'mixed' }
  } else if (rate >= 20) {
    return { text: '대체로 부정적', status: 'negative' }
  } else {
    return { text: '매우 부정적', status: 'negative' }
  }
}

export const reviewInfoMapColor = {
  positive: 'text-red-500',
  negative: 'text-blue-500',
  mixed: 'text-yellow-500',
  no_reviews: 'text-gray-500'
}
