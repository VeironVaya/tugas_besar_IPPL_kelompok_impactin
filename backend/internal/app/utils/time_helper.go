package utils

import "time"

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
