<?php declare(strict_types=1);

namespace OCA\Notes;

use OCP\Capabilities\ICapability;

class Capabilities implements ICapability {

	public function getCapabilities() {
		return [
			'notes' => [
				'api_version' => Application::$API_VERSIONS,
			],
		];
	}
}
