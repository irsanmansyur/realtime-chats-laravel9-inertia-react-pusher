<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserChatMessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "its_me" => $this->user_id == user('id'),
            'user_id' => $this->user_id,
            "telah_dibaca" => $this->status == config("chats.chat.DIBACA"),
            "content_singkat" => str()->limit($this->content, 20, ' ...')
        ];
    }
}
