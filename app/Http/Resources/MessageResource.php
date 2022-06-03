<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return array_merge(parent::toArray($request), [
            "its_me" => $this->user_id == user('id'),
            'status_pesan' => "terkirim",
            "from_user" => new FromUserResource($this->from_user),
            "to_user" => new FromUserResource($this->to_user),
        ]);
    }
}
