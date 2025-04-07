class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class CircularDoublyLinkedList:
    def __init__(self, max_value):
        self.head = None
        # Create nodes from 0 to max_value-1
        for i in range(max_value):
            self.insert(i)
    
    def insert(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            new_node.next = new_node
            new_node.prev = new_node
        else:
            last = self.head.prev
            last.next = new_node
            new_node.prev = last
            new_node.next = self.head
            self.head.prev = new_node

    def get_next(self, current_value):
        current = self.head
        while current.data != current_value:
            current = current.next
        return current.next.data

    def get_prev(self, current_value):
        current = self.head
        while current.data != current_value:
            current = current.next
        return current.prev.data

class Clock:
    def __init__(self):
        # Create circular lists for hours (0-23), minutes (0-59), and seconds (0-59)
        self.hours = CircularDoublyLinkedList(24)
        self.minutes = CircularDoublyLinkedList(60)
        self.seconds = CircularDoublyLinkedList(60)
        
        # Initialize time to 00:00:00
        self.current_hour = 0
        self.current_minute = 0
        self.current_second = 0

    def tick(self):
        # Advance one second
        self.current_second = self.seconds.get_next(self.current_second)
        
        # If we complete a minute
        if self.current_second == 0:
            self.current_minute = self.minutes.get_next(self.current_minute)
            
            # If we complete an hour
            if self.current_minute == 0:
                self.current_hour = self.hours.get_next(self.current_hour)

    def get_time(self):
        return f"{self.current_hour:02d}:{self.current_minute:02d}:{self.current_second:02d}"

# Example usage
if __name__ == "__main__":
    clock = Clock()
    
    # Print initial time
    print("Initial time:", clock.get_time())
    
    # Simulate some time passing
    for _ in range(3661):  # Advance 1 hour, 1 minute, and 1 second
        clock.tick()
    
    print("After 3661 seconds:", clock.get_time())
    
    # Demonstrate time zones (simplified example)
    def get_time_for_timezone(base_hour, offset):
        adjusted_hour = (base_hour + offset) % 24
        return adjusted_hour
    
    # Example time zone offsets (relative to Colombia)
    time_zones = {
        "Colombia": 0,
        "New York": -0,  # During certain times of the year
        "London": +5,    # During certain times of the year
        "Paris": +6,     # During certain times of the year
        "Tokyo": +13,    # During certain times of the year
    }
    
    # Print time for each timezone
    print("\nCurrent time in different time zones:")
    for zone, offset in time_zones.items():
        zone_hour = get_time_for_timezone(clock.current_hour, offset)
        print(f"{zone}: {zone_hour:02d}:{clock.current_minute:02d}:{clock.current_second:02d}")