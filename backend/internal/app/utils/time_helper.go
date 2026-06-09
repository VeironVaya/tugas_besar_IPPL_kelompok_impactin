package utils

import (
	"strings"
	"time"
)

func DetermineSubStatus(startDate time.Time, startTime string, endDate time.Time, endTime string,) (string, error) {

	startT, err := time.Parse("15:04", startTime)
	if err != nil {
		return "", err
	}

	endT, err := time.Parse("15:04", endTime)
	if err != nil {
		return "", err
	}

	startDateTime := time.Date(
		startDate.Year(), startDate.Month(), startDate.Day(),
		startT.Hour(), startT.Minute(), 0, 0, time.Local,
	)

	endDateTime := time.Date(
		endDate.Year(), endDate.Month(), endDate.Day(),
		endT.Hour(), endT.Minute(), 0, 0, time.Local,
	)

	now := time.Now()

	switch {
	case now.After(endDateTime) || now.Equal(endDateTime):
		return "completed", nil

	case (now.After(startDateTime) || now.Equal(startDateTime)) && now.Before(endDateTime):
		return "closed", nil

	default:
		return "opened", nil
	}
}

func MonthNameToNumber(s string) (int, bool) {
	months := map[string]int{
		"january": 1, "jan": 1,
		"february": 2, "feb": 2,
		"march": 3, "mar": 3,
		"april": 4, "apr": 4,
		"may": 5,
		"june": 6, "jun": 6,
		"july": 7, "jul": 7,
		"august": 8, "aug": 8,
		"september": 9, "sep": 9,
		"october": 10, "oct": 10,
		"november": 11, "nov": 11,
		"december": 12, "dec": 12,
	}
	m, ok := months[strings.ToLower(s)]
	return m, ok
}
