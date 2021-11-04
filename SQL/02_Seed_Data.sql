USE [Celestial]
GO

SET IDENTITY_INSERT [User] ON
INSERT INTO [user] ([id], [userName], [email], [fireBaseId])
VALUES (1, 'dan', 'dan@dan.com', 'H1Hj6QgycfbaS71FDxuz2S7dAi32'), (2, 'bob', 'bob@bob.com', '6JsKHl3kGPRyRkhe84WD8Cd6AmX2')
SET IDENTITY_INSERT [user] OFF

SET IDENTITY_INSERT [StarType] ON
INSERT INTO [StarType] ([id], [Type], [Details])
VALUES (1, 'O', 'An O-type star is a hot, blue-white star of spectral type O in the Yerkes classification system employed by astronomers. They have temperatures in excess of 30,000 kelvin (K). Stars of this type have strong absorption lines of ionised helium, strong lines of other ionised elements, and hydrogen and neutral helium lines weaker than spectral type B.'), 
(2, 'B', 'A B-type main-sequence star (B V) is a main-sequence (hydrogen-burning) star of spectral type B and luminosity class V.'), 
(3, 'A', 'An A-type main-sequence star (A V) or A dwarf star is a main-sequence (hydrogen-burning) star of spectral type A and luminosity class V (five).'), 
(4, 'F', 'An F-type main-sequence star (F V) is a main-sequence, hydrogen-fusing star of spectral type F and luminosity class V.'), 
(5, 'G', 'A G-type main-sequence star (Spectral type: G-V), often called a yellow dwarf, or G star, is a main-sequence star (luminosity class V) of spectral type G.'), 
(6, 'K', 'A K-type main-sequence star, also referred to as a K dwarf or orange dwarf, is a main-sequence (hydrogen-burning) star of spectral type K and luminosity class V.'),
(7, 'M', 'M-type stars are the most common stars in the universe, known as red dwarfs. Their mass is below 40% of the mass of our sun, Sol.')
SET IDENTITY_INSERT [StarType] OFF

SET IDENTITY_INSERT [Star] ON
INSERT INTO [Star] ([id], [Name], [Diameter], [Mass], [Temperature], [StarTypeId], [UserId])
VALUES (1, 'Sol', 1300000, 1, 5800, 3, 1 ), (2, 'Biggin', 12000000, 1, 8800, 1, 1)
SET IDENTITY_INSERT [Star] OFF

SET IDENTITY_INSERT [StarDetail] ON
INSERT INTO [StarDetail] ([Id], [StarId], [UserId], [Notes])
VALUES (1, 1, 1, 'Big old thing'),
(2, 2, 1, 'Wow'),
(4, 1, 1, 'No Way'),
(5, 1, 1, 'Test Dude'),
(6, 2, 1, 'Cow-A-Bung-Ah'),
(7, 1, 1, 'Hi')
SET IDENTITY_INSERT [StarDetail] OFF

SET IDENTITY_INSERT [Color] ON
INSERT INTO [Color] ([Id], [Paint])
VALUES (1, 'Red'), (2, 'Yellow'), (3, 'Blue'), (4, 'Orange'), (5, 'Purple'), (6, 'Green')
SET IDENTITY_INSERT [Color] OFF

SET IDENTITY_INSERT [PlanetType] ON
INSERT INTO [PlanetType] ([id], [Type], [Details])
VALUES (1, 'Rocky', 'Solid core'), (2, 'Gas Giant', 'Made up of gases'), (3, 'Ice Giant', 'Made up of ice')
SET IDENTITY_INSERT [PlanetType] OFF

SET IDENTITY_INSERT [Planet] ON
INSERT INTO [Planet] ([id], [Name], [Diameter], [DistanceFromStar], [OrbitalPeriod], [StarId], [PlanetTypeId], [ColorId], [UserId])
VALUES (1, 'Earthie', 12756, 150000000, 365, 1, 1, 1, 1), (2, 'Marsie', 6756, 200000000, 450, 1, 1, 2, 1), (3, 'Venwe', 12433, 110000000, 317, 1, 1, 3, 1),
(4, 'Urectum', 82756, 1500000000, 1800, 1, 2, 4, 1)
SET IDENTITY_INSERT [Planet] OFF

SET IDENTITY_INSERT [PlanetDetail] ON
INSERT INTO [PlanetDetail] ([Id], [UserId], [PlanetId], [Notes])
VALUES (1, 1, 1, 'Rocky Planet'),
(2, 1, 4, 'Gassy Planet'),
(3, 1, 3, 'Planets can go around the sun'),
(4, 1, 1, 'Sometimes has water')
SET IDENTITY_INSERT [PlanetDetail] OFF

SET IDENTITY_INSERT [MoonType] ON
INSERT INTO [MoonType] ([id], [Type], [Details])
VALUES (1, 'Full' , 'Moon at its biggest'), (2, 'Waxing Crescent', 'starting a new moon'), (3, 'Waning Crescent', 'Moon going away')
SET IDENTITY_INSERT [MoonType] OFF

SET IDENTITY_INSERT [Moon] ON
INSERT INTO [Moon] ([id], [Name], [Diameter], [DistanceFromPlanet], [OrbitalPeriod], [MoonTypeId], [PlanetId], [UserId])
VALUES (1, 'Hank', 3474, 385000, 27, 1, 1, 1), (2, 'Moo', 3500, 398000, 29, 1, 1, 1), (3, 'Luna', 5000, 1000, 7, 2, 2, 1)
SET IDENTITY_INSERT [Moon] OFF

SET IDENTITY_INSERT [MoonDetail] ON
INSERT INTO [MoonDetail] ([Id], [MoonId], [UserId], [Notes])
VALUES (1, 1, 1, 'Made of cheese'),
(2, 2, 4, 'Not a real planet'),
(3, 2, 3, 'Can see my house from here'),
(4, 3, 1, 'The name means moon')
SET IDENTITY_INSERT [MoonDetail] OFF
