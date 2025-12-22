package response

type EventCarouselItemDto struct {
	EventID    uint   `json:"event_id"`
	Title      string `json:"title"`
	Category   string `json:"category"`
	CoverImage string `json:"cover_image"`
}

type EventCarouselResponseDto struct {
	Health      *EventCarouselItemDto `json:"health"`
	Environment *EventCarouselItemDto `json:"environment"`
	Education   *EventCarouselItemDto `json:"education"`
	Community   *EventCarouselItemDto `json:"community"`
}
