-- Insert ticket data into the Ticket table
INSERT INTO Ticket (title, description, status, priority, createdAt, updatedAt) VALUES
-- Open tickets
('Cannot connect to VPN', 'User reports that they are unable to connect to the corporate VPN. Error code: 800.', 'OPEN', 'HIGH', '2024-12-20 09:15:00', '2024-12-20 09:15:00'),
('Printer not working', 'The office printer on the 3rd floor is not responding. Restarted twice with no success.', 'OPEN', 'MEDIUM', '2024-12-21 14:23:00', '2024-12-21 14:23:00'),
('Email not syncing', 'A user reports that their email client is not syncing with the server since this morning.', 'OPEN', 'LOW', '2024-12-22 08:45:00', '2024-12-22 08:45:00'),

-- In progress tickets
('System slowness reported', 'Multiple users report that the system is extremely slow during peak hours. Performance analysis needed.', 'IN_PROGRESS', 'HIGH', '2024-12-19 11:00:00', '2024-12-21 15:30:00'),
('Password reset request', 'User John.Doe forgot his password and needs assistance resetting it.', 'IN_PROGRESS', 'LOW', '2024-12-20 16:10:00', '2024-12-22 10:30:00'),

-- Closed tickets
('Software installation request', 'User requested installation of Adobe Photoshop on their workstation. Completed and verified.', 'CLOSED', 'LOW', '2024-12-15 10:00:00', '2024-12-16 13:45:00'),
('Access denied to shared folder', 'User was unable to access the Finance shared folder. Permission issues fixed.', 'CLOSED', 'MEDIUM', '2024-12-18 09:20:00', '2024-12-19 14:00:00'),
('Laptop replacement', 'User reported that their laptop is not working. Replacement issued.', 'CLOSED', 'HIGH', '2024-12-10 13:40:00', '2024-12-12 10:15:00');
