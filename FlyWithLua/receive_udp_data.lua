--Load socket library
local socket = require("socket")

-- Set position datarefs (writable)
dataref("override_gps", "sim/operation/override/override_gps", "writable")
dataref("COURSE", "laminar/B738/autopilot/course_pilot", "writable")

local controllers = {
	course = function(val)
		COURSE = val
	end,
}

local udp = assert(socket.udp())
udp:setsockname("127.0.0.1", 7070)

print("UDP listener on port 7070...")

udp:settimeout(nil)

-- Regex separator
function split(str, sep)
	local result = {}
	for part in string.gmatch(str, "([^" .. sep .. "]+)") do
		table.insert(result, part)
	end
	return result
end

function msgMiddleware(data)
	local controllerItems = split(data, ",")
	for _, controllerItem in ipairs(controllerItems) do
		local name, value = table.unpack(split(controllerItem, ":"))

		if controllers[name] ~= nil then
			controllers[name](value)
		end
	end
end

while true do
	local data, _, _ = udp:receivefrom()

	if data then
		msgMiddleware(data)
	end
end
