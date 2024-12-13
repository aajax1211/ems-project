export const formatDate = (dateString) => {
    console.log("Formatting date:", dateString);
  
    if (!dateString) return 'N/A';
  
    const date = new Date(parseInt(dateString));

    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${dateString}`);
      return 'Invalid Date';
    }
  
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  