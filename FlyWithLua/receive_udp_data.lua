--Load socket library
local socket = require("socket")
local json = require("dkjson")

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

function msgMiddleware(data)
	for k, v in pairs(data) do
		if controllers[k] then
			controllers[k](v)
		end
	end
end

while true do
	local data, _, _ = udp:receivefrom()

	if data then
		local obj, _, err = json.decode(data)

		if err then
			print("JSON decode error: " .. err)
		else
			msgMiddleware(obj)
		end
	end
end
